import { Card } from "../shared/ui/card";
import { useNavigate } from "react-router-dom";
import { Label } from "../shared/ui/label";
import { Input } from "../shared/ui/Input";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { USER_TYPES } from "@/shared/constants/userTypes";
import { Country } from "country-state-city";
import { useOrgsByCountry, useOrgSearch } from "@/hooks/useOrgQueries";
import { routes } from "@/shared/constants/routes";
import LoadingModal from "@/shared/components/LoadingModal";
import SocialMediaDisplay from "@/features/groups/components/SocialMediaDisplay";

const OrgsPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue, 1000);
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;

  const { data: orgs, isLoading: orgsLoading } = useOrgsByCountry(
    user?.country || null
  );
  const { data: foundOrgs, isLoading: foundLoading } =
    useOrgSearch(debounceSearch);

  const goToOrgDetails = (orgId: number) => {
    navigate(`${routes.org}/${orgId}`);
  };

  const orgsToDisplay =
    searchValue && searchValue.length > 3 ? foundOrgs : orgs;

  if (orgsLoading || foundLoading) return <LoadingModal show />;
  return (
    <div className="mt-2 standardMaxWidth">
      <Card>
        <div className="flex gap-4">
          <div>
            <Label htmlFor="org-search">Search for Organization</Label>
            <Input
              id="org-search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {orgsToDisplay?.map((group) => {
            return (
              <div
                key={group.id}
                className="p-6 border rounded w-[320px] bg-accent cursor-pointer flex flex-col justify-between"
                onClick={() => goToOrgDetails(group.id)}
              >
                <div>
                  <div>
                    {group.image ? (
                      <img
                        src={group.image}
                        className="rounded w-[320px] "
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                    <p className="text-xl font-semibold mt-4 capitalize">
                      {group.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-light">
                      {`${group.city} ${
                        Country.getCountryByCode(group.country)?.name || ""
                      }`}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">
                    {(group.description?.slice(0, 150) ||
                      "No description available.") +
                      (group.description?.length > 150 ? "..." : "")}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground flex flex-col gap-2 mt-2">
                  <div className="text-xs text-white">
                    <p>
                      Members: <span>{group.members.length}</span>
                    </p>
                  </div>
                  <SocialMediaDisplay
                    size="small"
                    links={{
                      instagram: group.instagram,
                      facebook: group.facebook,
                      twitter: group.twitter,
                      youtube: group.youtube,
                      tiktok: group.tiktok,
                      customLink: group.customLink,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default OrgsPage;
