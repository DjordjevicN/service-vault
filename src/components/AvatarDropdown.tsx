import { logoutUser } from "@/store/userSlice";
import { RootState } from "@/store";

import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import { USER_TYPES } from "@/constants/userTypes";
import { removeAuth } from "@/store/authSlice";
import MyDropdownMenu from "./myUiLibrary/MyDropdownMenu";
import { resetOrgForm } from "@/store/orgFormSlice";

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.user as USER_TYPES | null
  );

  const handleLogout = () => {
    dispatch(removeAuth());
    dispatch(logoutUser(null));
    dispatch(resetOrgForm());
    navigate("/");
  };

  const handleProfile = () => {
    if (user) {
      navigate(`/profile`);
    } else {
      navigate("/edit-profile");
    }
  };

  return (
    <MyDropdownMenu
      trigger={
        <div>
          <Avatar url={user?.image} />
        </div>
      }
      options={[
        {
          name: user?.username ? "Profile" : "Edit profile",
          action: handleProfile,
        },
        {
          name: "Logout",
          action: handleLogout,
        },
      ]}
    />
  );
};

export default AvatarDropdown;
