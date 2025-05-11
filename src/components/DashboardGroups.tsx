import { USER_TYPES } from "@/constants/userTypes";
import Button from "./UI/Button";
import { Link } from "react-router-dom";

const DashboardGroups = ({ user }: { user: USER_TYPES | null }) => {
  if (!user) return null;

  return (
    <div className="mt-6 bg-gray80 rounded p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-white">Your groups</h2>
        <p className="text-gray55 cursor-pointer">See all your groups</p>
      </div>
      <div className="mt-4">
        {user?.orgsIFollow?.length === 0 && (
          <p className="text-gray55">
            You are not part of any groups yet. Join a group to see events.
          </p>
        )}
        {/* {groups.map((group) => {
          return <DashboardGroupItem key={group.id} group={group} />;
        })} */}
      </div>

      <Link to="/meet-config">
        <Button wrapperClassName="mt-6 w-full">Create a Group</Button>
      </Link>
    </div>
  );
};

export default DashboardGroups;
