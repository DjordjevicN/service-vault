import { MeetType } from "@/constants/meetTypes";
import GroupListingItem from "./GroupListingItem";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { Separator } from "./ui/separator";

const DashboardListing = ({ meets }: { meets: MeetType[] | null }) => {
  if (!meets || meets.length === 0) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">No Meets Found</h2>
          <p className="text-muted-foreground mb-2">
            You are not attending any meets at the moment.
          </p>
          <p className="text-muted-foreground">
            Click below to view the full calendar of meets for this year.
          </p>
          <Link className="mt-6" to="/calendar">
            <Button>Full calendar</Button>
          </Link>
        </div>
      </Card>
    );
  }
  return (
    <div>
      {meets.map((meet) => {
        return (
          <Card className="py-0">
            <p className="mt-6 ml-4 text-xl">Meets you are attending</p>
            <Separator />
            <GroupListingItem key={meet.id} meet={meet} />
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardListing;
