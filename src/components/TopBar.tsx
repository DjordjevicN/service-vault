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
    <div className="flex items-center justify-between p-4 border-b border-gray55">
      <Logo />
      <Input
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        placeholder="Search"
        wrapperClassName="mt-0!"
      />
      <AvatarDropdown />
    </div>
  );
};

export default TopBar;
