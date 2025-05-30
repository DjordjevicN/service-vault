import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  parseISO,
  getDay,
} from "date-fns";

import { useQuery } from "@tanstack/react-query";
import { getAllMeets } from "@/supabase/meetFetchers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import LoadingModal from "../LoadingModal";
import { useEffect, useRef } from "react";
import { USER_TYPES } from "@/constants/userTypes";
import CalendarEventSlip from "./CalendarEventSlip";
import { motoGP } from "@/data/motoGP";

const YearCalendar = () => {
  const monthRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dispatch = useDispatch();
  const year = new Date().getFullYear();
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const { data: meets } = useQuery({
    queryKey: ["meets", user?.country],
    queryFn: () => getAllMeets(dispatch),
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

  const getWeekdayIndex = (date: Date) => (getDay(date) + 6) % 7;
  const externalEvents = motoGP;
  if (!meets) return <LoadingModal show />;
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-8 h-screen overflow-y-auto">
        {months.map((month, index) => {
          const monthStart = startOfMonth(month);
          const monthEnd = endOfMonth(month);
          const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

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
                  const dayEvents = [...externalEvents, ...meets].filter((ev) =>
                    isSameDay(parseISO(ev.startDate), day)
                  );

                  return (
                    <div
                      key={day.toString()}
                      className={`cursor-pointer border rounded p-1 min-h-[200px]  ${
                        dayEvents.length ? "" : ""
                      }`}
                      title={`${dayEvents.length} event(s)`}
                    >
                      <div className="flex gap-2">
                        <span>{format(day, "d")}</span>
                        <span className="text-gray-500">
                          {format(day, "EEE")}
                        </span>
                      </div>
                      {dayEvents.length > 0 && (
                        <div className="mt-2 overflow-y-scroll max-h-[300px]">
                          {dayEvents.map((event) => {
                            return (
                              <CalendarEventSlip key={event.id} event={event} />
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
  );
};

export default YearCalendar;
