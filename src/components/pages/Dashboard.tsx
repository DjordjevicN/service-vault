import "react-calendar/dist/Calendar.css";
import DashboardGroups from "../DashboardGroups";
import DashboardListing from "../DashboardListing";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { USER_TYPES } from "@/constants/userTypes";
import { useLoggedUser, useMeetIdsFromUser } from "@/hooks/useUser";
import { useUsersMeets } from "@/hooks/useMeetQueries";
import { AuthUser } from "@supabase/supabase-js";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useMyOrgs } from "@/hooks/useOrgQueries";

const Dashboard = () => {
  const auth = useSelector((state: RootState) => state.auth as AuthUser | null);
  const user = useSelector(
    (state: RootState) => state.user as USER_TYPES | null
  );
  const meets = useSelector((state: RootState) => state.meets);
  const meetIds = useMeetIdsFromUser(user);
  const { data: orgsIAmMember } = useMyOrgs(user?.id || null);
  useLoggedUser(auth || null);
  useUsersMeets(meetIds);

  const handleRedirectToCalendar = () => {
    window.location.href = "/calendar";
  };

  return (
    <div className="mt-2">
      <Card className="p-6 mb-2">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">
            {`Welcome, ${user?.username || auth?.email}`}
          </h1>
          <div className="flex flex-col text-right gap-2 ml-auto">
            <Link to="/meet-config">
              <Button>Create a Meet</Button>
            </Link>
            <Link to="/org-config">
              <Button>Create a Organization</Button>
            </Link>
          </div>
        </div>
      </Card>
      <div>
        <div className="grid grid-cols-[1fr_2fr] gap-2">
          <div>
            <Card>
              <Button onClick={handleRedirectToCalendar}>Full calendar</Button>
            </Card>

            <div className="mt-2">
              <DashboardGroups orgs={orgsIAmMember ?? null} />
            </div>
          </div>
          <Card>
            <p className="mt-6 ml-4 text-xl">Meets you are attending</p>
            {meets ? (
              <DashboardListing meets={meets || []} />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-xl font-semibold mb-4">No Meets Found</h2>
                <p className="text-muted-foreground">
                  You are not attending any meets.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
