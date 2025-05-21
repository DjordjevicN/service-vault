import React, { useEffect } from "react";
import Input from "./UI/Input";
import { useDebounce } from "../hooks/useDebounce";
import Logo from "./Logo";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";

const TopBar = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const user = useSelector((state: RootState) => state.user);
  const debounceSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!debounceSearch) {
      return;
    }
    console.log("searchValue", searchValue);
  }, [debounceSearch]);

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray55">
      <Logo />
      <Input
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        placeholder="Search"
        wrapperClassName="mt-0!"
      />
      {user ? (
        <AvatarDropdown />
      ) : (
        <div>
          <Link className="text-white" to="/login">
            Signup / Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopBar;
