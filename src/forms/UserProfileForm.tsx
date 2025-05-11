import { updateUser } from "@/api/userApi";
import Button from "@/components/UI/Button";
import DivideLine from "@/components/UI/DivideLine";
import Input from "@/components/UI/Input";
import { USER_TYPES } from "@/constants/userTypes";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";

const UserProfileForm = () => {
  const user = useSelector((state) => state.user);
  const [editedUser, setEditedUser] = useState({ ...user });

  const { mutate } = useMutation({
    mutationFn: (editedUser: USER_TYPES) => updateUser(editedUser),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(editedUser);
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
            label="Email"
            value={editedUser.email}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, email: value }))
            }
          />
          <Input
            label="Password"
            value={editedUser.password}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, password: value }))
            }
          />
          <DivideLine className="my-4" />
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
          <Input
            label="Bio"
            value={editedUser.bio}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, bio: value }))
            }
          />
          <DivideLine className="my-4" />
          <Input
            label="Motorcycle"
            value={editedUser.motorcycle}
            onChange={(value) =>
              setEditedUser((prev) => ({ ...prev, motorcycle: value }))
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
