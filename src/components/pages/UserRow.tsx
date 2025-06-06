import { USER_TYPES } from "@/constants/userTypes";
import Avatar from "../Avatar";

import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "@/supabase/userFetchers";
import { updateMeet } from "@/supabase/meetFetchers";
import { MeetType } from "@/constants/meetTypes";
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from "@/store/userSlice";
import { RootState } from "@/store";
import { AuthUser } from "@supabase/supabase-js";
import { Button } from "../ui/button";

const UserRow = ({
  user,
  meet,
  updateUser,
}: {
  user: USER_TYPES;
  meet: MeetType;
  updateUser: () => void;
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const navigateToUser = (id: string) => {
    console.log(`Navigate to user with id: ${id}`);
  };

  const { mutate: removeUserFromMeet } = useMutation({
    mutationFn: async ({
      user,
      meet,
    }: {
      user: USER_TYPES | null;
      meet: MeetType;
    }) => {
      const updatedUser = await updateUserProfile(user?.uuid, {
        attendingMeets: (user?.attendingMeets ?? []).filter(
          (meetId: number) => meetId !== meet.id
        ),
      });

      const updatedMeet = await updateMeet(meet.id, {
        participants: meet.participants.filter(
          (participantId: string) => participantId !== user?.id
        ),
      });
      return { updatedUser, updatedMeet };
    },

    onSuccess: (data) => {
      dispatch(storeUser(data.updatedUser));
      updateUser();
    },
  });

  const removeUser = (id: number) => {
    if (id === user.id) {
      removeUserFromMeet({ user, meet });
    }
  };
  const permissionToRemove = (
    auth: AuthUser | null,
    meet: MeetType,
    user: USER_TYPES
  ) => {
    if (!auth || !meet?.participants?.includes(user.id)) return false;

    const isOrganizer = auth.id === meet.organizerId;
    const isSelf = auth.id === user.uuid;
    return isOrganizer || isSelf;
  };
  return (
    <div className="px-4 py-2 mb-2 border-b">
      <div
        className="flex items-center gap-6"
        onClick={() => navigateToUser(user.id)}
      >
        <Avatar url={user.image} size={32} />

        <div className="min-w-[150px] overflow-hidden">
          <p className="text-white text-sm">{user.username}</p>
        </div>
        <div>
          <p className="text-gray55 text-sm">
            {user.currentMotorcycle !== "" ? user.currentMotorcycle : "/"}
          </p>
        </div>
        <div className="ml-auto flex items-center w-[100px]">
          {permissionToRemove(auth, meet, user) && (
            <Button variant="ghost" onClick={() => removeUser(user.id)}>
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRow;
