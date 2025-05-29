import {
  startOfYear,
  endOfYear,
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

type Event = {
  id: string;
  date: string; // ISO string
  title: string;
};

const YearCalendar = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(yearStart);
  const events: Event[] = []; // Replace with actual events

  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const handleDayClick = (date: Date) => {
    navigate(`/events?date=${format(date, "yyyy-MM-dd")}`);
  };

  const handleCreateClick = () => {
    navigate("/meet-config");
  };

  const getWeekdayIndex = (date: Date) => (getDay(date) + 6) % 7; // Monday = 0, Sunday = 6

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Year {year}</h2>
        <Button onClick={handleCreateClick}>+ Create Event</Button>
      </div>

      <div className="flex flex-col gap-8">
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
                  const dayEvents = events.filter((ev) =>
                    isSameDay(parseISO(ev.date), day)
                  );

                  return (
                    <div
                      key={day.toString()}
                      onClick={() => handleDayClick(day)}
                      className={`cursor-pointer border rounded p-1 h-[200px] hover:bg-black/10 ${
                        dayEvents.length ? "bg-blue-100" : ""
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
                        <div className="text-blue-600 font-bold text-center">
                          {dayEvents.length}
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
