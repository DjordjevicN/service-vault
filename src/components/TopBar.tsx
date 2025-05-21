import { useEffect, useState } from "react";

import { useDebounce } from "../hooks/useDebounce";
import Logo from "./Logo";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { ThemeSwitch } from "./ThemeSwitch";

const TopBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const debounceSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!debounceSearch) {
      return;
    }
    console.log("searchValue", searchValue);
  }, [debounceSearch]);

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <Logo />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          className="max-w-[300px] mb-0"
        />
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          {user ? (
            <AvatarDropdown />
          ) : (
            <div>
              <Link to="/login">Signup / Login</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopBar;
