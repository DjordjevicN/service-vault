import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES } from "@/constants/userTypes";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/api/userApi";
import { storeUser } from "@/store/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;

  const [formData, setFormData] = useState<USER_TYPES | null>(user);

  const { mutate } = useMutation({
    mutationFn: (formData: USER_TYPES) => updateUser(formData),
    onSuccess: (data) => {
      console.log("User updated successfully", data);
      dispatch(storeUser(data.user));
    },
  });
  const handleUserUpdate = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!formData) return;
    mutate(formData);
  };
  if (!formData) return;

  return (
    <div className="p-6">
      <h1 className="text-3xl">User Profile</h1>
      <form onSubmit={handleUserUpdate} className="">
        <div className="mb-4 flex flex-col">
          <label htmlFor="username">username</label>
          <input
            value={formData.username}
            className="border"
            type="text"
            id="username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">email</label>
          <input
            value={formData.email}
            className="border"
            type="text"
            id="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">password</label>
          <input
            value={formData.password}
            className="border"
            type="text"
            id="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="motorcycle">Motorcycle</label>
          <input
            value={formData.motorcycle}
            className="border"
            type="text"
            id="motorcycle"
            onChange={(e) =>
              setFormData({ ...formData, motorcycle: e.target.value })
            }
          />
        </div>
        <button type="submit">Update profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
