import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { USER_TYPES } from "@/constants/userTypes";
import Avatar from "../Avatar";
import GroupListingItem from "../GroupListingItem";
import { Link } from "react-router-dom";
import LoadingModal from "../LoadingModal";
import { formatToMonthYear } from "../utils/dateFormating";
import { getAllMeetsByUserId } from "@/supabase/meetFetchers";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { AuthUser } from "@supabase/supabase-js";

const UserProfile = () => {
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;

  const auth = useSelector((state: RootState) => state.auth) as AuthUser | null;

  const usersMeets = useQuery({
    queryKey: ["meets", user?.uuid],
    queryFn: () =>
      user?.uuid
        ? getAllMeetsByUserId(user.uuid)
        : Promise.reject("User UUID is undefined"),
    enabled: !!user?.uuid,
  });

  if (!user) {
    return <LoadingModal show={!user} />;
  }
  const formatted = formatToMonthYear(auth?.created_at || "");
  return (
    <div className="mt-4">
      <Card className="px-6">
        <div className="flex gap-6 text-white">
          <Avatar size={100} />
          <div>
            <div className="flex justify-between items-center">
              <p className="text-xl">{user?.username}</p>
            </div>
            <div className="text-gray55 mt-3 text-sm">
              <p>{user?.email}</p>
              <p>
                {user?.city} <span>{user?.country}</span>
              </p>
              <p>Joined on {formatted}</p>
            </div>
          </div>
          <Link to={"/edit-profile"} className="text-gradient text-sm ml-auto">
            Edit profile
          </Link>
        </div>
      </Card>
      <div className="grid grid-cols-[1fr_2fr] gap-4 mt-4">
        <div>
          <Card className="px-6">
            <div className=" flex items-center justify-between">
              <div className="text-center">
                <p className="text-gray50 text-2xl">
                  {user?.myMeets?.length || 0}
                </p>
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
          </Card>
        </div>
        <div>
          <div>
            {usersMeets.data?.map((meet) => {
              return <GroupListingItem key={meet.id} meet={meet} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
