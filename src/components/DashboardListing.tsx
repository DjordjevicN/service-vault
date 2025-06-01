import { MeetType } from "@/constants/meetTypes";
import GroupListingItem from "./GroupListingItem";

const DashboardListing = ({ meets }: { meets: MeetType[] | null }) => {
  if (!meets || meets.length === 0) return;
  return (
    <div>
      {meets.map((meet) => {
        return (
          <div key={meet.id}>
            <GroupListingItem meet={meet} />
          </div>
        );
      })}
    </div>
  );
};

export default DashboardListing;
