import React, { useEffect } from "react";
import Input from "./UI/Input";
import { useDebounce } from "../hooks/useDebounce";

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
    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-300">
      <div className="flex items-center">
        <h1 className="text-2xl text-black font-bold p-4">Meet App</h1>
        <Input
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
          placeholder="Search"
        />
      </div>
      <div>
        <div className="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center">
          A
        </div>
      </div>
    </div>
  );
};

export default TopBar;
