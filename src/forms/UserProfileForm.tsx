import { CountrySelect } from "@/components/CountrySelect";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { USER_TYPES } from "@/constants/userTypes";
import { useCreateUser, useUpdateUser } from "@/hooks/useUser";
import { RootState } from "@/store";
import { AuthUser } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
const UserProfileForm = () => {
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const auth = useSelector((state: RootState) => state.auth) as AuthUser | null;
  const [editedUser, setEditedUser] = useState({ ...user });
  const { mutate: createNewUser } = useCreateUser();
  const { mutate: updateUser, status } = useUpdateUser();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newUser = {
      ...editedUser,
    };

    if (user && auth) {
      updateUser({ auth, newUser });
    } else {
      createNewUser(newUser);
    }
  };

  return (
    <Card className="px-6 min-w-[500px] mx-auto">
      <div className="">
        <form>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={editedUser.username}
            onChange={(e) =>
              setEditedUser((prev) => ({
                ...prev,
                username: e.target.value.toLowerCase(),
              }))
            }
          />
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            disabled
            value={auth?.email}
            onChange={(e) =>
              setEditedUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            disabled
            placeholder="********"
            value={editedUser.password}
            onChange={(e) =>
              setEditedUser((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={editedUser.city}
            onChange={(e) =>
              setEditedUser((prev) => ({
                ...prev,
                city: e.target.value.toLowerCase(),
              }))
            }
          />

          <CountrySelect
            value={editedUser.country}
            onSelect={(country) =>
              setEditedUser((prev) => ({
                ...prev,
                country: country,
              }))
            }
          />
          <Label className="mt-4" htmlFor="motorcycle">
            Motorcycle
          </Label>
          <Input
            id="motorcycle"
            value={editedUser.currentMotorcycle}
            onChange={(e) =>
              setEditedUser((prev) => ({
                ...prev,
                currentMotorcycle: e.target.value,
              }))
            }
          />
          <Button
            className="mt-2"
            disabled={
              status === "pending" ||
              !editedUser.username ||
              !editedUser.country
            }
            onClick={(e) => handleSubmit(e)}
          >
            {status === "pending" && <Loader2 className="mr-2 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default UserProfileForm;
