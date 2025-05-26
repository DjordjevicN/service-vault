import { Card } from "../ui/card";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewMember,
  fetchOrgById,
  getOrgMembers,
  removeMember,
  updateMembersStatus,
  updateOrg,
} from "@/supabase/orgFetchers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { IMember, IOrganization } from "@/constants/orgTypes";
import placeholder from "@/assets/placeholder.png";
import SocialMediaDisplay from "../SocialMediaDisplay";
import DashboardListing from "../DashboardListing";
import { getAllMeets } from "@/supabase/meetFetchers";
import { ORG_MEMBER_STATUS_LABELS } from "@/constants/orgMemberStatus";
import { USER_TYPES } from "@/constants/userTypes";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { searchUsersByEmailOrUsername } from "@/supabase/userFetchers";
import SearchUserResultItem from "../SearchUserResultItem";
import { Button } from "../ui/button";

const OrgDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const organization = useSelector(
    (state: RootState) => state.organization
  ) as IOrganization | null;
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const [searchValue, setSearchValue] = useState("");
  useQuery({
    queryKey: ["orgDetails", id],
    queryFn: () => fetchOrgById(Number(id), dispatch),
    enabled: !!id,
  });
  const { data: allMeets } = useQuery({
    queryKey: ["allMeets"],
    queryFn: () => getAllMeets(dispatch),
  });
  const { data: members, refetch } = useQuery({
    queryKey: ["orgMembers"],
    queryFn: () => getOrgMembers(Number(id)),
    enabled: !!id && !!organization,
  });
  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }: { id: number; status: number }) =>
      updateMembersStatus(id, status),
    onSuccess: () => {
      console.log("Status updated successfully");
      refetch();
    },
    onError: (error) => {
      console.error("Error updating status:", error);
    },
  });
  const { mutate: updateOrganization } = useMutation({
    mutationFn: ({
      orgId,
      update,
    }: {
      orgId: number;
      update: Partial<IOrganization>;
    }) => updateOrg(orgId, update),
    onSuccess: () => {
      console.log("Organization updated successfully");
      refetch();
    },
    onError: (error) => {
      console.error("Error updating organization:", error);
    },
  });
  const { mutate: createMember } = useMutation({
    mutationFn: (member: IMember) => createNewMember(member),
    onSuccess: () => {
      console.log("New member created successfully");
      refetch();
    },
    onError: (error) => {
      console.error("Error creating new member:", error);
    },
  });

  const { mutate: deleteMember } = useMutation({
    mutationFn: (memberId: number) => removeMember(memberId),
    onSuccess: () => {
      console.log("Member removed successfully");
      refetch();
    },
    onError: (error) => {
      console.error("Error removing member:", error);
    },
  });

  const handleStatusChange = (memberId: number, status: number) => {
    updateStatus({ id: memberId, status });
  };
  const { data: foundUsers } = useQuery({
    queryKey: ["user search", searchValue],
    queryFn: () => searchUsersByEmailOrUsername(searchValue),
    enabled: !!searchValue && searchValue.length > 3,
  });
  const handleAddMember = (user: USER_TYPES) => {
    if (!organization || !user) return;
    const isAlreadyMember = members?.find(
      (member) => member.userId === user.id
    );
    if (isAlreadyMember) return;
    updateOrganization({
      orgId: organization.id!,
      update: { members: [...(organization.members || []), user.id] },
    });
    const newMember = {
      userId: user.id,
      username: user.username,
      status: 1,
      image: user.image,
      orgId: organization.id,
    };
    createMember(newMember);
    setSearchValue("");
  };
  const handleRemoveMember = (userId: number) => {
    if (!organization) return;
    const currentMembers = organization.members || [];
    const updatedMemberList = currentMembers.filter(
      (member) => member !== userId
    );

    updateOrganization({
      orgId: organization.id!,
      update: { members: updatedMemberList },
    });
    deleteMember(userId);
    refetch();
  };
  if (!organization) return;
  const isAdmin = user && user.id === organization.admin;
  return (
    <div className="mt-4">
      <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
        <div>
          <Card>
            <div>
              <img
                src={organization.image || placeholder}
                alt="organization"
                className="w-full"
              />
              <div className="mt-6">
                <p className="text-2xl capitalize">{organization.name}</p>
                <p className="mt-4 text-muted-foreground">
                  {organization.description}
                </p>
                <SocialMediaDisplay
                  links={{
                    instagram: organization.instagram,
                    facebook: organization.facebook,
                    twitter: organization.twitter,
                    youtube: organization.youtube,
                    tiktok: organization.tiktok,
                    customLink: organization.customLink,
                  }}
                />
              </div>
            </div>
          </Card>
          <Card className="mt-4">
            <p>
              Members: <span>{members?.length || 0}</span>
            </p>
            <div>
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

              {members && members.length > 0 ? (
                members.map((member) => {
                  return (
                    <div
                      key={member.id}
                      className="flex items-center gap-4 mt-2"
                    >
                      <img
                        src={member.image || placeholder}
                        className="w-10 h-10 rounded-full object-cover"
                        alt=""
                      />
                      <p className="capitalize w-28 overflow-hidden truncate">
                        {member.username}
                      </p>
                      {isAdmin ? (
                        <select
                          name="status"
                          id={`status-${member.id}`}
                          value={member.status}
                          onChange={(e) =>
                            handleStatusChange(
                              member.id,
                              Number(e.target.value)
                            )
                          }
                        >
                          {Object.entries(ORG_MEMBER_STATUS_LABELS).map(
                            ([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            )
                          )}
                        </select>
                      ) : (
                        <p>{ORG_MEMBER_STATUS_LABELS[member.status]}</p>
                      )}
                      {isAdmin && (
                        <Button
                          className="ml-auto text-red-400"
                          variant="ghost"
                          onClick={() => handleRemoveMember(member.userId)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  );
                })
              ) : (
                <div>No members found.</div>
              )}
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <p>buttons</p>
          </Card>
          <div className="mt-4">
            <DashboardListing meets={allMeets || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgDetails;
