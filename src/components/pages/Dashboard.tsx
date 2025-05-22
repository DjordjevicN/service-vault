import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import DashboardGroups from "../DashboardGroups";
import DashboardListing from "../DashboardListing";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import { USER_TYPES } from "@/constants/userTypes";
import LoadingModal from "../LoadingModal";
import { useLoggedUser, useMeetIdsFromUser } from "@/hooks/useUser";
import { useMeetsFromMyCountry, useUsersMeets } from "@/hooks/useMeetQueries";
import { Calendar } from "../ui/calendar";
import { AuthUser } from "@supabase/supabase-js";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const Dashboard = () => {
  const [value, onChange] = useState<Date | undefined>(new Date());
  const auth = useSelector((state: RootState) => state.auth as AuthUser | null);
  const user = useSelector(
    (state: RootState) => state.user as USER_TYPES | null
  );

  useLoggedUser(auth);
  const meetIds = useMeetIdsFromUser(user);

  useUsersMeets(meetIds);
  const { data: meetsFromMyCountry, isLoading: meetsIsLoading } =
    useMeetsFromMyCountry(user?.country || "");

  const allMeets = () => {
    const allMeets = [];

    if (meetsFromMyCountry) {
      allMeets.push(...meetsFromMyCountry);
    }
    return allMeets;
  };
  if (meetsIsLoading) {
    return <LoadingModal show />;
  }
  return (
    <div className="mt-4">
      <Card className="p-6 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            {`Welcome, ${user?.username || auth?.email}`}
          </h1>
          <Link to="/meet-config">
            <Button>Create a Meet</Button>
          </Link>
        </div>
        <p className="text-xl">Events from your groups</p>
      </Card>
      <div>
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <div>
            <Card>
              <Calendar
                mode="single"
                selected={value}
                onSelect={onChange}
                className="rounded-md mx-auto"
              />
            </Card>
            <DashboardGroups user={user} />
          </div>
          <div>
            <DashboardListing meets={allMeets()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
