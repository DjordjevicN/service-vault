import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { IOrganization } from "@/constants/orgTypes";
import DashboardGroupItem from "./DashboardGroupItem";

const DashboardGroups = ({ orgs }: { orgs: IOrganization[] | null }) => {
  const hasGroups = orgs && orgs.length > 0;
  return (
    <Card className="px-4">
      <div className="rounded">
        <div className="flex items-center justify-between px-4">
          <h2 className=" text-white">Your groups</h2>
          <Link to="/orgs" className="text-gray55 text-sm cursor-pointer">
            See all groups
          </Link>
        </div>
        <div className="mt-2">
          {!hasGroups && (
            <p className="text-sm text-muted-foreground">
              You are not part of any groups yet. Join a group to see events.
            </p>
          )}
          {hasGroups &&
            orgs.map((group) => {
              return <DashboardGroupItem key={group.id} group={group} />;
            })}
        </div>
      </div>
    </Card>
  );
};

export default DashboardGroups;
