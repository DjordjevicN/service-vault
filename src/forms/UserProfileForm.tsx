import Button from "@/components/myUiLibrary/Button";
import DivideLine from "@/components/myUiLibrary/DivideLine";
import Input from "@/components/myUiLibrary/Input";
import { USER_TYPES } from "@/constants/userTypes";
import { RootState } from "@/store";
import { storeUser } from "@/store/userSlice";
import { createUser, updateUserProfile } from "@/supabase/userFetchers";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const auth = useSelector((state: RootState) => state.auth);
  const [editedUser, setEditedUser] = useState({ ...user });

  const { mutate: createNewUser } = useMutation({
    mutationFn: (newUser: USER_TYPES) => createUser(newUser),
    onSuccess: (data) => {
      dispatch(storeUser(data));
    },
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: (newUser: USER_TYPES) => updateUserProfile(auth.id, newUser),
    onSuccess: (data) => {
      dispatch(storeUser(data));
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newUser = {
      ...editedUser,
    };

    if (user) {
      updateUser(newUser);
    } else {
      createNewUser(newUser);
    }
  };
  return (
    <div className="">
      <div className="w-[500px] p-6 mx-auto bg-gray80 rounded">
        <form>
          <Input
            label="Username"
            value={editedUser.username}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, username: value }))
            }
          />
          <Input
            disabled
            label="Email"
            value={auth?.email}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, email: value }))
            }
          />
          <Input
            type="password"
            disabled
            label="Password"
            value={editedUser.password}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, password: value }))
            }
          />

          <Input
            label="City"
            value={editedUser.city}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, city: value }))
            }
          />
          <Input
            label="Country"
            value={editedUser.country}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, country: value }))
            }
          />

          <DivideLine className="my-4" />
          <Input
            label="Motorcycle"
            value={editedUser.currentMotorcycle}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, currentMotorcycle: value }))
            }
          />
          <Button
            onClick={(e) => handleSubmit(e)}
            wrapperClassName="mt-6 w-full"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
