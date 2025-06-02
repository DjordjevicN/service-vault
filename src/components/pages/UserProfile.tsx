import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { USER_TYPES } from "@/constants/userTypes";
import Avatar from "../Avatar";
import GroupListingItem from "../GroupListingItem";
import { Link, useNavigate } from "react-router-dom";
import LoadingModal from "../LoadingModal";
import { formatToMonthYear } from "../utils/dateFormating";
import { getAllMeetsByUserId } from "@/supabase/meetFetchers";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { AuthUser } from "@supabase/supabase-js";
import { Button } from "@/components/ui/Button";
import { getAllOrganizationByMemberId } from "@/supabase/orgFetchers";
import DashboardGroups from "../DashboardGroups";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;

  const auth = useSelector((state: RootState) => state.auth) as AuthUser | null;

  const { data: orgsIAmMember } = useQuery({
    queryKey: ["orgsIAmMember", user?.id],
    queryFn: () => getAllOrganizationByMemberId((user?.id as number) || 0),
    enabled: !!user?.id,
  });
  const { data: usersMeets } = useQuery({
    queryKey: ["meets", user?.uuid],
    queryFn: () =>
      user?.uuid
        ? getAllMeetsByUserId(user?.uuid)
        : Promise.reject("User UUID is undefined"),
    enabled: !!user?.uuid,
  });

  if (!user) {
    return <LoadingModal show={true} />;
  }

  const handleNavigate = () => {
    navigate("/edit-avatar");
  };
  const formatted = formatToMonthYear(auth?.created_at || "");

  return (
    <div className="mt-2 standardMaxWidth">
      <Card className="px-6">
        <div className="flex gap-6 text-white">
          <div className="relative">
            <Avatar url={user?.image} size={100} />
            <div
              onClick={() => handleNavigate()}
              className="opacity-0 hover:opacity-80 bg-black cursor-pointer w-[100px] h-[100px] absolute top-0 left-0 rounded-full flex items-center justify-center animate-fade-in-out transition-all duration-300"
            >
              <p>Edit</p>
            </div>
          </div>
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

          <div className="flex flex-col text-right gap-2 ml-auto">
            <Link to="/edit-profile" className="text-gradient text-sm ml-auto">
              <Button>Edit profile</Button>
            </Link>
            <Link to="/meet-config">
              <Button>Create a Meet</Button>
            </Link>
            <Link to="/org-config">
              <Button>Create a Organization</Button>
            </Link>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-[1fr_2fr] gap-2 mt-2">
        <div>
          <DashboardGroups orgs={orgsIAmMember ?? null} />
        </div>
        <div>
          <Card className="gap-0">
            <p className="mb-6">Meets you have created</p>
            {usersMeets?.map((meet) => {
              return <GroupListingItem key={meet.id} meet={meet} />;
            })}
            {usersMeets?.length === 0 && (
              <div className="text-center">
                <p className="text-xl font-semibold mb-4">No Meets Found</p>
                <p className="text-muted-foreground">
                  You have not created any meets yet.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
