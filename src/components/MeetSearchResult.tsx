import { MeetType } from "@/constants/meetTypes";
import placeholder from "@/assets/placeholder.png";
import { getDate } from "./utils/getDates";
const MeetSearchResult = ({ meet }: { meet: MeetType }) => {
  const handleNavigate = () => {
    window.location.href = "/meet/" + meet.id;
  };
  return (
    <div
      className="flex w-[320px] gap-3 cursor-pointer items-center p-2 hover:bg-muted-foreground/10"
      onClick={() => handleNavigate()}
    >
      <img
        className="w-16 h-16 object-cover"
        src={meet.image || placeholder}
        alt="meet image"
      />
      <div>
        <p className="text-xs uppercase text-muted-foreground">
          {getDate(meet.startDate)}
        </p>
        <p className="text-sm capitalize">{meet.name}</p>
        <p className="text-xs text-muted-foreground">
          {meet.city}
          {meet.country ? `, ${meet.country}` : ""}
        </p>
      </div>
    </div>
  );
};

export default MeetSearchResult;
