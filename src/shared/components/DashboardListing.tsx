import GroupListingItem from "@/features/groups/components/GroupListingItem";
import { MeetType } from "@/shared/constants/meetTypes";

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
