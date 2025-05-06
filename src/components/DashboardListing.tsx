import { MeetType } from "@/constants/meetTypes";
import GroupListingItem from "./GroupListingItem";

const DashboardListing = ({ meets }: { meets: MeetType[] | null }) => {
  if (!meets || meets.length === 0) {
    return <div className="text-white">No events available</div>;
  }
  return (
    <div>
      {meets.map((meet) => {
        return <GroupListingItem key={meet.id} meet={meet} />;
      })}
    </div>
  );
};

export default DashboardListing;
