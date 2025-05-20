import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DashboardGroups from "../DashboardGroups";
import DashboardListing from "../DashboardListing";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { USER_TYPES } from "@/constants/userTypes";
import LoadingModal from "../LoadingModal";
import { useLoggedUser, useMeetIdsFromUser } from "@/hooks/useUser";
import { useMeetsFromMyCountry, useUsersMeets } from "@/hooks/useMeetQueries";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Dashboard = () => {
  const [value, onChange] = useState<Value>(new Date());
  const auth = useSelector((state: RootState) => state.auth);
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-white mt-14 mb-10">
          {`Welcome, ${user?.username || auth?.email}`}
        </h1>
        <Link to="/meet-config">
          <Button wrapperClassName="mt-6 w-full">Create a Meet</Button>
        </Link>
      </div>
      <p className="text-white text-xl mb-10">Events from your groups</p>
      <div className="">
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <div className="">
            <div>
              <div className="bg-gray80 rounded p-6">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
            <DashboardGroups user={user} />
          </div>
          <div>
            <div className="flex justify-end items-center gap-3 my-4">
              <p className="text-gray55">Favorite</p>
              {/* <Switch onChange={setFetchOnlyFavorites} /> */}
            </div>
            <DashboardListing meets={allMeets()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
