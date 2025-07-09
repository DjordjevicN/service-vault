import { Card } from "../shared/ui/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { IMember } from "@/shared/constants/orgTypes";
import placeholder from "@/assets/placeholder.png";
import {
  ORG_MEMBER_STATUS,
  ORG_MEMBER_STATUS_LABELS,
} from "@/shared/constants/orgMemberStatus";
import { USER_TYPES } from "@/shared/constants/userTypes";
import { useState } from "react";
import { Label } from "../shared/ui/label";
import { Input } from "@/shared/ui/Input";
import { Button } from "../shared/ui/Button";
import { useOrgDetails } from "@/hooks/useOrgQueries";
import { routes } from "@/shared/constants/routes";
import {
  useCreateMember,
  useDeleteMember,
  useMeetsByOrgId,
  useOrgMembers,
  useUpdateMemberStatus,
  useUpdateOrganization,
} from "@/hooks/useMeetQueries";
import { useUserFinder } from "@/hooks/useUser";
import LoadingModal from "@/shared/components/LoadingModal";
import SocialMediaDisplay from "@/features/groups/components/SocialMediaDisplay";
import SearchUserResultItem from "@/features/groups/components/SearchUserResultItem";
import DashboardListing from "@/shared/components/DashboardListing";
import EmptyStateBox from "@/shared/components/EmptyStateBox";
import OrgAdminActions from "@/features/groups/components/OrgAdminActions";

const OrgDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [memberSearchValue, setMemberSearchValue] = useState("");
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const { data: organization, isLoading } = useOrgDetails(
    id ? Number(id) : null,
    dispatch
  );
  const { data: allMeets } = useMeetsByOrgId(organization?.id);
  const { data: members, refetch } = useOrgMembers(Number(id));
  const { mutate: updateStatus } = useUpdateMemberStatus(refetch);
  const { mutate: updateOrganization } = useUpdateOrganization(refetch);
  const { mutate: createMember } = useCreateMember(refetch);
  const { mutate: deleteMember } = useDeleteMember(refetch);
  const { data: foundUsers } = useUserFinder(searchValue);

  const handleSearchMembers = () => {
    if (!memberSearchValue || memberSearchValue.length < 3) return;
    const filteredMembers = members?.filter((member) =>
      member.username.toLowerCase().includes(memberSearchValue.toLowerCase())
    );
    return filteredMembers && filteredMembers.length > 0 ? filteredMembers : [];
  };

  const isCurrentUserAlreadyMember = members?.some(
    (member) => member.userId === user?.id
  );

  const handleAddMember = (user: USER_TYPES | null) => {
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
      status: ORG_MEMBER_STATUS.FOLLOWER,
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
      (member: IMember) => member.userId !== userId
    );

    updateOrganization({
      orgId: organization.id!,
      update: { members: updatedMemberList },
    });
    deleteMember(userId);
    refetch();
  };

  const memberAdmin = members?.find(
    (member) =>
      member.userId === user?.id && member.status === ORG_MEMBER_STATUS.ADMIN
  );

  const isAdmin = user && organization && user.id === organization.admin;

  const handleOrgMeetCreation = () => {
    if (!organization) return;
    localStorage.setItem("orgId", String(organization.id));
    navigate(routes.meetConfig);
  };
  const membersToDisplay = () => {
    if (!members) return [];
    const filtered =
      memberSearchValue && memberSearchValue.length >= 3
        ? handleSearchMembers()
        : members;

    return filtered?.sort((a, b) => {
      if (
        a.status === ORG_MEMBER_STATUS.FOLLOWER &&
        b.status !== ORG_MEMBER_STATUS.FOLLOWER
      )
        return 1;
      if (
        a.status !== ORG_MEMBER_STATUS.FOLLOWER &&
        b.status === ORG_MEMBER_STATUS.FOLLOWER
      )
        return -1;
      return 0;
    });
  };

  if (isLoading) return <LoadingModal show />;
  if (!organization) return;
  return (
    <div className="mt-2 standardMaxWidth">
      <div className="grid grid-cols-[1fr_1fr] gap-2 mt-2">
        <div>
          <Card>
            <div>
              <img
                src={organization.image || placeholder}
                alt="organization"
                className="w-full max-w-[200px]"
              />
              <div className="mt-6">
                <p className="text-2xl capitalize">{organization.name}</p>
                <p className="text-xs text-muted-foreground">
                  {organization.address}
                </p>
                <p className="text-xs text-muted-foreground">
                  {organization.city} <span>{organization.country}</span>
                </p>

                <p className="mt-2 text-muted-foreground">
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
          {isAdmin || memberAdmin ? (
            <Card className="mt-2">
              <div className="relative">
                <div>
                  <Label htmlFor="org-search">Add New Member</Label>
                  <Input
                    id="org-search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search by email or username"
                  />
                </div>
                <div>
                  {foundUsers && (
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
                  )}
                </div>
              </div>
            </Card>
          ) : null}
          <Card className="mt-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-between gap-2 w-full">
                <p>
                  Members: <span>{members?.length || 0}</span>
                </p>
                {isAdmin || memberAdmin ? (
                  <div>
                    <Label htmlFor="member-search">Search Members</Label>
                    <Input
                      id="member-search"
                      placeholder="Search by username"
                      onChange={(e) => setMemberSearchValue(e.target.value)}
                    />
                  </div>
                ) : null}
              </div>
              {!isAdmin && (
                <div>
                  {isCurrentUserAlreadyMember ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveMember(user?.id || 0)}
                      className="text-blue-400"
                    >
                      Leave Organization
                    </Button>
                  ) : (
                    <Button
                      className="text-blue-400"
                      variant="ghost"
                      onClick={() => handleAddMember(user)}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div>
              <div className="max-h-[300px] overflow-y-auto">
                {membersToDisplay()?.map((member) => {
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
                            updateStatus({
                              id: member.id,
                              status: Number(e.target.value),
                            })
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
                      {isAdmin || memberAdmin ? (
                        <Button
                          className="ml-auto text-red-400"
                          variant="ghost"
                          onClick={() => handleRemoveMember(member.userId)}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
        <div>
          {isAdmin || memberAdmin ? (
            <Card className="mb-2">
              <div className="flex gap-4 items-center">
                <Button onClick={handleOrgMeetCreation} className="w-fit">
                  Create Meet as an Organization
                </Button>
                <Link to={`${routes.orgConfig}/${id}`}>
                  <Button>Edit Organization</Button>
                </Link>
              </div>
            </Card>
          ) : null}

          <Card>
            <p className="text-lg">Meets created by {organization.name}</p>
            {allMeets && allMeets.length > 0 ? (
              <DashboardListing meets={allMeets} />
            ) : (
              <EmptyStateBox
                title="No Meets Found"
                description="This organization has not created any meets yet."
              />
            )}
          </Card>
        </div>
      </div>
      <OrgAdminActions isAdmin={!!isAdmin} orgId={organization.id} />
    </div>
  );
};

export default OrgDetails;
