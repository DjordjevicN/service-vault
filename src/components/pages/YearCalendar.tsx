import {
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  parseISO,
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
  const events = [];
  // get all months (1-12)
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const handleDayClick = (date: Date) => {
    // redirect to your event list filtered by date (adjust URL as needed)
    navigate(`/events?date=${format(date, "yyyy-MM-dd")}`);
  };

  const handleCreateClick = () => {
    navigate("/meet-config");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Year {year}</h2>
        <Button onClick={handleCreateClick}>+ Create Event</Button>
      </div>

      <div className="flex flex-col gap-4">
        {months.map((month) => {
          const monthStart = startOfMonth(month);
          const monthEnd = endOfMonth(month);
          const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

          return (
            <div key={month.toString()} className="">
              <h3 className="text-center font-semibold mb-2">
                {format(month, "MMMM")}
              </h3>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {days.map((day) => {
                  const dayEvents = events.filter((ev) =>
                    isSameDay(parseISO(ev.date), day)
                  );

                  return (
                    <div
                      key={day.toString()}
                      onClick={() => handleDayClick(day)}
                      className={`cursor-pointer border rounded p-1 h-[200px] w-full hover:bg-black/40 ${
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
