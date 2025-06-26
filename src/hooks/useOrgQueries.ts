import {
  fetchOrgById,
  getAllOrganizationByMemberId,
  getOrgMembers,
} from "@/supabase/orgFetchers";
import { Dispatch } from "@reduxjs/toolkit";
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

export const useOrgDetails = (id: number | null, dispatch: Dispatch) => {
  return useQuery({
    queryKey: ["orgDetails", id],
    queryFn: () => fetchOrgById(Number(id), dispatch),
    enabled: !!id,
  });
};
