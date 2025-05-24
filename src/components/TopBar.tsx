import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Logo from "./Logo";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import { ThemeSwitch } from "./ThemeSwitch";

import { Card } from "./ui/card";
import { Input } from "./ui/input";

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
    <Card className="px-6 py-4 mt-2">
      <div className="flex items-center justify-between">
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
              <Link to="/login">Sign up / Login</Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TopBar;
