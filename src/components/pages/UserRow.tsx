import { USER_TYPES } from "@/constants/userTypes";
import Avatar from "../Avatar";
import Button from "../myUiLibrary/Button";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "@/supabase/userFetchers";
import { updateMeet } from "@/supabase/meetFetchers";
import { MeetType } from "@/constants/meetTypes";
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from "@/store/userSlice";
import { RootState } from "@/store";

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
          (meetId: string) => meetId !== meet.id
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

  const removeUser = (id: string) => {
    if (id === user.id) {
      removeUserFromMeet({ user, meet });
    }
  };
  const permissionToRemove = (auth: any, meet: MeetType, user: USER_TYPES) => {
    if (!auth || !meet?.participants?.includes(user.id)) return false;

    const isOrganizer = auth.id === meet.organizerId;
    const isSelf = auth.id === user.uuid;
    return isOrganizer || isSelf;
  };
  return (
    <div
      className="flex items-center mb-3 p-2 gap-6 bg-gray80 rounded"
      onClick={() => navigateToUser(user.id)}
    >
      <Avatar url={user.image} size={32} />

      <div className="min-w-[150px] overflow-hidden">
        <p className="text-white text-sm">{user.username}</p>
      </div>
      <div>
        <p className="text-gray55 text-sm">
          {user.motorcycle !== "" ? user.motorcycle : "/"}
        </p>
      </div>
      <div className="ml-auto flex items-center w-[100px]">
        {permissionToRemove(auth, meet, user) && (
          <Button variant="text" onClick={() => removeUser(user.id)}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserRow;
