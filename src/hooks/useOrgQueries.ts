import {
  deleteOrg,
  fetchOrgById,
  getAllOrganizationByMemberId,
  getOrgMembers,
  getOrgsByTheCountry,
} from "@/supabase/orgFetchers";
import { getOrgSearchInformation } from "@/supabase/searchFetchers";
import { Dispatch } from "@reduxjs/toolkit";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOrgsByCountry = (country: string | null) => {
  return useQuery({
    queryKey: ["orgs by country", country],
    queryFn: () => getOrgsByTheCountry(country),
    enabled: !!country,
  });
};

export const useOrgSearch = (searchValue: string) => {
  return useQuery({
    queryKey: ["org search", searchValue],
    queryFn: () => getOrgSearchInformation(searchValue),
    enabled: !!searchValue && searchValue.length > 3,
  });
};

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

export const useDeleteOrganization = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (orgId: number) => deleteOrg(orgId),
    onSuccess: () => {
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error("Error deleting organization:", error);
    },
  });
};
