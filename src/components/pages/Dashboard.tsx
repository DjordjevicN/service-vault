import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DashboardGroups from "../DashboardGroups";
import DashboardListing from "../DashboardListing";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { MeetType } from "@/constants/meetTypes";
import Switch from "../UI/Switch";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { getAllMeetsByIds } from "@/supabase/meetFetchers";
import { storeUser } from "@/store/userSlice";
import { getUserById } from "@/supabase/userFetchers";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [value, onChange] = useState<Value>(new Date());
  const [fetchOnlyFavorites, setFetchOnlyFavorites] = useState<boolean>(false);
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector(
    (state: RootState) => state.user as USER_TYPES | null
  );

  const storedMeets = useSelector(
    (state: RootState) => state.meets as MeetType[] | null
  );

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUserById(auth.id);
      dispatch(storeUser(data));
      return data;
    },
    enabled: !!auth.id,
  });

  const meetIds = useMemo(() => {
    if (!user) return [];
    if (fetchOnlyFavorites) {
      return Array.from(new Set(user.favoriteMeets || []));
    }
    return Array.from(
      new Set([
        ...(user.myMeets || []),
        ...(user.favoriteMeets || []),
        ...(user.attendingMeets || []),
      ])
    );
  }, [user, fetchOnlyFavorites]);

  useQuery({
    queryKey: ["meets"],
    queryFn: () => getAllMeetsByIds(meetIds, dispatch),
    enabled: !!user && meetIds.length > 0,
  });

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
              <Switch onChange={setFetchOnlyFavorites} />
            </div>
            <DashboardListing meets={storedMeets} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
