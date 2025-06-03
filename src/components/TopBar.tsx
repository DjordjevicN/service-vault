import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Logo from "./Logo";
import AvatarDropdown from "./AvatarDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
// import { ThemeSwitch } from "./ThemeSwitch";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { useQuery } from "@tanstack/react-query";
import { getSearchInformation } from "@/supabase/searchFetchers";
import MeetSearchResult from "./MeetSearchResult";

const TopBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const debounceSearch = useDebounce(searchValue, 1000);

  const searchResults = useQuery({
    queryKey: ["search for meets", debounceSearch],
    queryFn: () => getSearchInformation(debounceSearch),
    enabled: !!debounceSearch,
  });

  return (
    <Card className="px-6 py-4 mt-2 standardMaxWidth">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="relative">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="max-w-[300px] mb-0"
          />

          {searchResults.data && (
            <div className="absolute left-1/2 transform -translate-x-1/2 overflow-y-auto z-10 bg-accent rounded border p-4">
              {searchResults.data?.map((meet) => (
                <MeetSearchResult key={meet.id} meet={meet} />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* <ThemeSwitch /> */}
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
