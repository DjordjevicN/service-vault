import placeholder from "@/assets/placeholder.png";
import { MeetType } from "@/constants/meetTypes";
import { useNavigate } from "react-router-dom";

const CalendarEventSlip = ({ event }: { event: MeetType }) => {
  const navigate = useNavigate();

  const handleMeetRedirect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/meet/${event.id}`);
  };

  return (
    <div
      key={event.id}
      className={`w-full bg-accent/50 hover:bg-accent px-1 py-2 mb-1 cursor-pointer `}
      onClick={(e) => handleMeetRedirect(e)}
    >
      <div className="flex items-center gap-2 mb-1">
        <img
          src={event.image || placeholder}
          className="w-5 h-5 rounded-full object-cover"
          alt="event avatar"
        />
        <div>
          <p className="w-full font-bold overflow-auto truncate text-xs">
            {event.name}
          </p>
          {event.organizerName && (
            <p className="text-[10px] text-muted-foreground">
              by: <span className="">{event.organizerName}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarEventSlip;
