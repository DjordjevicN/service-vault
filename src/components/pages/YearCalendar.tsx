import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  parseISO,
  getDay,
  isToday,
  isWithinInterval,
} from "date-fns";

import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/store";
import LoadingModal from "../LoadingModal";
import { useEffect, useRef, useState } from "react";
import { USER_TYPES } from "@/constants/userTypes";
import { Card } from "../ui/card";
import CalendarCountryFilter from "@/components/CalendarCountryFilter";
import CalendarEventSlip from "../CalendarEventSlip";
import { useSelector } from "react-redux";
import { getMeetsByTheCountries } from "@/supabase/meetFetchers";
import TodaysEventsModal from "../TodaysEventsModal";
import { MeetType } from "@/constants/meetTypes";

const YearCalendar = () => {
  const monthRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [todaysEvents, setTodaysEvents] = useState<MeetType[]>([]);

  const year = new Date().getFullYear();
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const { data: meets } = useQuery({
    queryKey: ["meets", selectedCountries],
    queryFn: () => getMeetsByTheCountries(selectedCountries),
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentMonthIndex = new Date().getMonth();
      const target = monthRefs.current[currentMonthIndex];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const addCountry = (country: string) => {
    if (selectedCountries.includes(country)) return;
    setSelectedCountries((prev) => [...prev, country]);
  };

  const removeCountry = (country: string) => {
    setSelectedCountries((prev) => prev.filter((c) => c !== country));
  };
  useEffect(() => {
    if (user?.country) {
      setSelectedCountries((prev) => {
        if (prev.includes(user.country!)) return prev;
        return [...prev, user.country!];
      });
    }
  }, [user]);

  const getWeekdayIndex = (date: Date) => (getDay(date) + 6) % 7;

  if (!meets) return <LoadingModal show />;
  return (
    <>
      <TodaysEventsModal
        events={todaysEvents}
        setTodaysEvents={setTodaysEvents}
      />
      <div className="mt-4 h-screen flex flex-col">
        <div className="">
          <Card className="sticky top-0 z-10 shadow ">
            <CalendarCountryFilter
              selectedCountries={selectedCountries}
              onCountryChange={addCountry}
              onCountryRemove={removeCountry}
            />
          </Card>
        </div>
        <div className="flex flex-col gap-8 h-screen overflow-y-auto">
          {months.map((month, index) => {
            const monthStart = startOfMonth(month);
            const monthEnd = endOfMonth(month);
            const days = eachDayOfInterval({
              start: monthStart,
              end: monthEnd,
            });

            const leadingEmptyDays = Array.from({
              length: getWeekdayIndex(monthStart),
            });

            return (
              <div
                key={month.toString()}
                ref={(el) => {
                  monthRefs.current[index] = el;
                }}
              >
                <h3 className="text-center font-semibold mb-2 text-lg">
                  {format(month, "MMMM")} {year}
                </h3>
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {/* Weekday headers */}
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center font-semibold text-gray-600"
                      >
                        {day}
                      </div>
                    )
                  )}

                  {/* Leading empty days */}
                  {leadingEmptyDays.map((_, i) => (
                    <div key={`empty-${i}`} className="p-1 h-[200px]" />
                  ))}

                  {/* Days of the month */}
                  {days.map((day) => {
                    const dayEvents = [...meets].filter((ev) => {
                      const eventStart = parseISO(ev.startDate);
                      const eventEnd = parseISO(ev.endDate);
                      return isWithinInterval(day, {
                        start: eventStart,
                        end: eventEnd,
                      });
                    });
                    const isCurrentDay = isToday(day);
                    return (
                      <div
                        key={day.toString()}
                        className={`cursor-pointer border rounded p-1 min-h-[200px] ${
                          isCurrentDay ? "border-orange-600" : ""
                        } ${dayEvents.length ? "" : ""}`}
                        title={`${dayEvents.length} event(s)`}
                        onClick={() => {
                          setTodaysEvents(dayEvents);
                        }}
                      >
                        <div className={`flex gap-2 items-center mb-2 `}>
                          <span>{format(day, "d")}</span>
                          <span className="text-gray-500">
                            {format(day, "EEE")}
                          </span>
                        </div>
                        {dayEvents.length > 0 && (
                          <div className="mt-2 overflow-y-scroll max-h-[300px]">
                            {dayEvents.map((event) => {
                              return (
                                <CalendarEventSlip
                                  key={event.id}
                                  event={event}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default YearCalendar;
