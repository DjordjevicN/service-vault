import { logoutUser } from "@/store/userSlice";
import { RootState } from "@/store";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { USER_TYPES } from "@/constants/userTypes";
import { removeAuth } from "@/store/authSlice";

const AvatarDropdown = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.user as USER_TYPES | null
  );
  const auth = useSelector((state: RootState) => state.auth);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  useOutsideClick(dropdownRef, closeDropdown);

  const handleLogout = () => {
    dispatch(removeAuth());
    dispatch(logoutUser(null));
  };

  return (
    <div
      ref={dropdownRef}
      className="relative cursor-pointer"
      onClick={toggleDropdown}
    >
      {(user || auth) && <Avatar />}
      {dropdownOpen && (user || auth) && (
        <div className="absolute right-0 top-12 bg-gray60 shadow-lg rounded w-48 p-6 z-10">
          <div>
            {user && <p className="text-sm text-white">{user.username}</p>}
            <div className="h-0.5 bg-gray55 my-4"></div>
          </div>
          <div className="">
            <ul className="flex flex-col gap-4 mt-4">
              {user && (
                <li>
                  <Link
                    to={user.username ? "/profile" : "/edit-profile"}
                    className="hover:text-gray50 cursor-pointer rounded text-white"
                  >
                    Profile
                  </Link>
                </li>
              )}

              <li
                onClick={handleLogout}
                className="hover:text-gray50 cursor-pointer  text-white"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
