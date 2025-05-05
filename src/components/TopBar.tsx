import React, { useEffect } from "react";
import Input from "./UI/Input";
import { useDebounce } from "../hooks/useDebounce";
import logo from "../assets/logo.svg";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/userSlice";

const TopBar = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const debounceSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!debounceSearch) {
      return;
    }
    console.log("searchValue", searchValue);
  }, [debounceSearch]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("User logged out");
    dispatch(logoutUser(null));
    window.location.href = "/";
  };
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-300">
      <div className="flex items-center ">
        <div className="flex items-center gap-4">
          <img src={logo} alt="app logo" />
          <h1 className="text-gradient font-bold text-2xl">MOTO MEETS</h1>
        </div>
      </div>
      <Input
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        placeholder="Search"
      />
      <div className="relative cursor-pointer" onClick={toggleDropdown}>
        <div className="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center">
          A
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 top-12 bg-gray60 shadow-lg rounded w-48 p-6">
            <div>
              <p className="text-sm text-white">Nikola Djordjevic</p>
              <div className="h-0.5 bg-gray55 my-4"></div>
            </div>
            <div className="">
              <ul className="flex flex-col gap-4 mt-4">
                <li className="hover:text-gray50 cursor-pointer rounded text-white">
                  Profile
                </li>

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
    </div>
  );
};

export default TopBar;
