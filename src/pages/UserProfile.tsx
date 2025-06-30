import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { USER_TYPES } from "@/constants/userTypes";
import Avatar from "../components/Avatar";
import GroupListingItem from "../components/GroupListingItem";
import { Link, useNavigate } from "react-router-dom";
import LoadingModal from "../components/LoadingModal";
import { formatToMonthYear } from "../components/utils/dateFormating";
import { Card } from "../components/ui/card";
import { AuthUser } from "@supabase/supabase-js";
import { Button } from "@/components/ui/Button";
import DashboardGroups from "../components/DashboardGroups";
import { useMyOrgs } from "@/hooks/useOrgQueries";
import { useMeetsByUsersUUID } from "@/hooks/useMeetQueries";
import { routes } from "@/constants/routes";
import EmptyStateBox from "@/components/EmptyStateBox";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;

  const auth = useSelector((state: RootState) => state.auth) as AuthUser | null;
  const { data: orgsIAmMember } = useMyOrgs(user?.id ?? null);
  const { data: usersMeets } = useMeetsByUsersUUID(user?.uuid || "");

  if (!user) {
    return <LoadingModal show />;
  }

  const handleNavigate = () => {
    navigate(routes.userAvatarEdit);
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
            <Link
              to={routes.userEdit}
              className="text-gradient text-sm ml-auto"
            >
              <Button>Edit profile</Button>
            </Link>
            <Link to={routes.meetConfig}>
              <Button>Create a Meet</Button>
            </Link>
            <Link to={routes.orgConfig}>
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
            <EmptyStateBox
              show={usersMeets?.length === 0}
              title="No Meets Found"
              description="You have not created any meets yet."
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
