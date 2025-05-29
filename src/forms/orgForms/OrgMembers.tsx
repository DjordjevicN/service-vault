import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Card, CardTitle } from "@/components/ui/card";
import { updateOrgForm } from "@/store/orgFormSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchUsersByEmailOrUsername } from "@/supabase/userFetchers";
import SearchUserResultItem from "@/components/SearchUserResultItem";
import { USER_TYPES } from "@/constants/userTypes";
import OrgMemberConfigCard from "@/components/OrgMemberConfigCard";

const OrgMembers = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const orgForm = useSelector((state: RootState) => state.organizationForm);
  const { data: foundUsers } = useQuery({
    queryKey: ["user search", searchValue],
    queryFn: () => searchUsersByEmailOrUsername(searchValue),
    enabled: !!searchValue && searchValue.length > 3,
  });

  const handleAddMember = (user: USER_TYPES) => {
    if (!user || !orgForm) return;
    const currentMembers = orgForm.members ?? [];
    const isAlreadyMember = currentMembers.find(
      (member) => member.userId === user.id
    );
    if (isAlreadyMember) return;
    const newMember = {
      userId: user.id,
      username: user.username,
      status: 1,
    };
    const updatedMemberList = [...currentMembers, newMember];
    console.log("updatedMemberList", updatedMemberList);

    dispatch(updateOrgForm({ key: "members", value: updatedMemberList }));
    setSearchValue("");
  };
  const handleRemoveMember = (userId: number) => {
    if (!orgForm) return;
    const currentMembers = orgForm.members ?? [];
    const updatedMemberList = currentMembers.filter(
      (member) => member.userId !== userId
    );
    dispatch(updateOrgForm({ key: "members", value: updatedMemberList }));
  };
  const handleChangeStatus = (userId: number, status: number) => {
    if (!orgForm) return;
    const currentMembers = orgForm.members ?? [];
    const updatedMemberList = currentMembers.map((member) => {
      if (member.userId === userId) {
        return { ...member, status };
      }
      return member;
    });
    dispatch(updateOrgForm({ key: "members", value: updatedMemberList }));
  };
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 mt-2">
      <Card className="px-6">
        <div>
          <h2 className="w-fit">
            Add <span className="text-gradient">Members</span>
          </h2>
          <p className="text-gray55 mt-6">
            Add members to your organization and set their role.
          </p>
        </div>
      </Card>
      <Card className="px-6">
        <div>
          <Label htmlFor="org-search">Search for members by email</Label>
          <Input
            id="org-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {foundUsers && (
            <div className="relative">
              <div className="absolute w-full bg-card border rounded p-2 text-xs">
                {foundUsers?.map((user) => {
                  return (
                    <SearchUserResultItem
                      user={user}
                      key={user.id}
                      onAdd={handleAddMember}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>
      {orgForm?.members && (
        <Card className="px-6">
          <CardTitle>Organization Members</CardTitle>
          {orgForm.members.map((member) => {
            return (
              <OrgMemberConfigCard
                key={member.userId}
                member={member}
                onRemove={handleRemoveMember}
                onChangeStatus={handleChangeStatus}
              />
            );
          })}
        </Card>
      )}
    </div>
  );
};

export default OrgMembers;
