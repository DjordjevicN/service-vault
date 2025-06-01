import {
  getAllOrganizationByMemberId,
  getOrgMembers,
} from "@/supabase/orgFetchers";
import { useQuery } from "@tanstack/react-query";

export const useMyOrgs = (userId: number | null) => {
  return useQuery({
    queryKey: ["orgsIAmMember", userId],
    queryFn: () => getAllOrganizationByMemberId(userId || 0),
    enabled: !!userId,
  });
};

export const useOrgMembers = (orgId: number | null) => {
  return useQuery({
    queryKey: ["orgMembers", orgId],
    queryFn: () => getOrgMembers(orgId || 0),
    enabled: !!orgId,
  });
};
