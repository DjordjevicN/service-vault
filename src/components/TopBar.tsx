import React, { useEffect } from "react";
import Input from "./UI/Input";
import { useDebounce } from "../hooks/useDebounce";
import Logo from "./Logo";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { createMeet } from "@/supabase/meetFetchers";
import Button from "./UI/Button";

const TopBar = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const debounceSearch = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (!debounceSearch) {
      return;
    }
    console.log("searchValue", searchValue);
  }, [debounceSearch]);

  const meetForm = useSelector((state: RootState) => state.meetForm);
  const { mutate } = useMutation({
    mutationFn: (meet: any) => createMeet(meet),
    onSuccess: (data) => {
      console.log("Meet created successfully", data);
      // navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error creating meet:", error);
    },
  });

  const handleCreateMeet = () => {
    mutate(meetForm);
  };
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray55">
      <Button onClick={handleCreateMeet}>Click</Button>
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
