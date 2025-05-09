import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { USER_TYPES } from "@/constants/userTypes";

import Avatar from "../Avatar";
import { meets } from "@/data/meetData";
import GroupListingItem from "../GroupListingItem";
import DashboardGroups from "../DashboardGroups";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4 mt-14">
      <div className="">
        <div className="bg-gray70">
          <img
            className="w-full h-[400px] object-cover"
            src={user?.image}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between gap-4 p-6 mt-6 bg-gray80">
          <div className="text-center">
            <p className="text-gray50 text-2xl">{user?.myMeets.length}</p>
            <p className="text-gray55">Meets</p>
          </div>
          <div className="text-center">
            <p className="text-gray50 text-2xl">30</p>
            <p className="text-gray55">Members</p>
          </div>
          <div className="text-center">
            <p className="text-gray50 text-2xl">30k</p>
            <p className="text-gray55">Followers</p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_5fr] p-6 text-white bg-gray80 mt-6">
          <div>
            <Avatar />
          </div>
          <div className="">
            <div className="flex justify-between items-center">
              <p className="text-xl">{user?.username}</p>
              <Link to={"/edit-profile"} className="text-gradient text-sm">
                Edit profile
              </Link>
            </div>
            <div className="text-gray55 mt-3 text-sm">
              <p>{user?.email}</p>
              <p>{user?.motorcycle}</p>
              <p>Belgrade, RS</p>
              <p>Joined Rider Meets on Jan 2018</p>
            </div>
          </div>
        </div>

        <DashboardGroups />
        <DashboardGroups />
      </div>
      <div className="">
        <div className="bg-gray80 rounded p-6">
          <h2 className="text-xl text-white font-bold mb-6">Events</h2>
          <div>
            {meets.map((meet) => {
              return <GroupListingItem meet={meet} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
