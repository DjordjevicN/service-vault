import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  parseISO,
  getDay,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getAllMeets } from "@/supabase/meetFetchers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import LoadingModal from "../LoadingModal";
import placeholder from "@/assets/placeholder.png";

const YearCalendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const user = useSelector((state: RootState) => state.user);
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const { data: meets } = useQuery({
    queryKey: ["meets", user.country],
    queryFn: () => getAllMeets(dispatch),
    // queryFn: () => getMeetsByTheCountry(user.country),
  });
  console.log("Meets data:", meets);

  const handleDayClick = (id: number) => {
    navigate(`/meet-config/${id}`);
  };
  const handleMeetRedirect = (id: number) => {
    navigate(`/meet/${id}`);
  };

  const handleCreateClick = () => {
    navigate("/meet-config");
  };

  const getWeekdayIndex = (date: Date) => (getDay(date) + 6) % 7; // Monday = 0, Sunday = 6
  if (!meets) return <LoadingModal show />;
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-bold">Year {year}</h2>
        <Button onClick={handleCreateClick}>+ Create Event</Button>
      </div>

      <div className="flex flex-col gap-8 h-screen overflow-y-scroll">
        {months.map((month) => {
          const monthStart = startOfMonth(month);
          const monthEnd = endOfMonth(month);
          const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

          // Determine how many empty boxes before the 1st to align Monday as the first column
          const leadingEmptyDays = Array.from({
            length: getWeekdayIndex(monthStart),
          });

          return (
            <div key={month.toString()}>
              <h3 className="text-center font-semibold mb-2 text-lg">
                {format(month, "MMMM")}
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
                  const dayEvents = meets.filter((ev) =>
                    isSameDay(parseISO(ev.startDate), day)
                  );

                  return (
                    <div
                      key={day.toString()}
                      className={`cursor-pointer border rounded p-1 min-h-[200px] hover:bg-black/10 ${
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
                              <div
                                className="w-full bg-border p-1 mb-1 "
                                onClick={() => handleMeetRedirect(event.id)}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <img
                                    src={event.image || placeholder}
                                    className="w-5 h-5 rounded-full object-cover"
                                    alt=""
                                  />
                                  <div>
                                    <p className="w-full overflow-auto truncate text-xs">
                                      {event.name}
                                    </p>
                                    <p>
                                      by: <span>{event.organizerName}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
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
