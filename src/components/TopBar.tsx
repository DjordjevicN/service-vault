import React, { useEffect } from "react";
import Input from "./UI/Input";
import { useDebounce } from "../hooks/useDebounce";
import Logo from "./Logo";
import AvatarDropdown from "./AvatarDropdown";

const TopBar = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const debounceSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!debounceSearch) {
      return;
    }
    console.log("searchValue", searchValue);
  }, [debounceSearch]);

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-gray55">
      <Logo />
      <Input
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        placeholder="Search"
      />
      <AvatarDropdown />
    </div>
  );
};

export default TopBar;
