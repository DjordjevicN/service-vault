import { USER_TYPES } from "@/constants/userTypes";
import { Card } from "./ui/card";

const DashboardGroups = ({ user }: { user: USER_TYPES | null }) => {
  if (!user) return null;

  return (
    <Card className="mt-4">
      <div className="rounded px-6">
        <div className="flex items-center justify-between">
          <h2 className=" text-white">Your groups</h2>
          <p className="text-gray55 text-sm cursor-pointer">
            See all your groups
          </p>
        </div>
        <div className="mt-4">
          {!user?.orgsIFollow && (
            <p className="text-sm text-muted-foreground">
              You are not part of any groups yet. Join a group to see events.
            </p>
          )}
          {/* {groups.map((group) => {
          return <DashboardGroupItem key={group.id} group={group} />;
        })} */}
        </div>
      </div>
    </Card>
  );
};

export default DashboardGroups;
