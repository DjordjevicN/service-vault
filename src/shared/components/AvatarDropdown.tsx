import { logoutUser } from "@/store/userSlice";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_TYPES } from "@/shared/constants/userTypes";
import { removeAuth } from "@/store/authSlice";
import { resetOrgForm } from "@/store/orgFormSlice";
import MyDropdownMenu from "../myUiLibrary/MyDropdownMenu";
import { routes } from "../constants/routes";
import Avatar from "./Avatar";

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.user as USER_TYPES | null
  );

  const handleLogout = () => {
    dispatch(removeAuth(null));
    dispatch(logoutUser(null));
    dispatch(resetOrgForm());
    navigate(routes.home);
  };

  const handleProfile = () => {
    if (user) {
      navigate(routes.userProfile);
    } else {
      navigate(routes.userEdit);
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
