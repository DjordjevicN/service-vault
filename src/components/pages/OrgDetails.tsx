import { Card } from "../ui/card";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchOrgById,
  getOrgMembers,
  updateMembersStatus,
} from "@/supabase/orgFetchers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { IOrganization } from "@/constants/orgTypes";
import placeholder from "@/assets/placeholder.png";
import SocialMediaDisplay from "../SocialMediaDisplay";
import DashboardListing from "../DashboardListing";
import { getAllMeets } from "@/supabase/meetFetchers";
import { ORG_MEMBER_STATUS_LABELS } from "@/constants/orgMemberStatus";
import { USER_TYPES } from "@/constants/userTypes";

const OrgDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const organization = useSelector(
    (state: RootState) => state.organization
  ) as IOrganization | null;
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
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

  const handleStatusChange = (memberId: number, status: number) => {
    updateStatus({ id: memberId, status });
  };

  if (!organization) return;
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
                      {user && user.id === organization.admin ? (
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
