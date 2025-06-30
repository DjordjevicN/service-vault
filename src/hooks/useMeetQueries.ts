import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteMeet,
  fetchMeetById,
  getAllMeetsByIds,
  getAllMeetsByUserId,
  getAllOrgMeets,
  getMeetsByTheCountries,
  getMeetsByTheCountry,
} from "@/supabase/meetFetchers";
import { getAllUsersByIds, getUserById } from "@/supabase/userFetchers";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import {
  createNewMember,
  fetchOrgById,
  getOrgMembers,
  removeMember,
  updateMembersStatus,
  updateOrg,
} from "@/supabase/orgFetchers";
import { Dispatch } from "@reduxjs/toolkit";
import { IMember, IOrganization } from "@/constants/orgTypes";

export const useMeetDetails = (id?: string) => {
  return useQuery({
    queryKey: ["meet", id],
    queryFn: () => (id ? fetchMeetById(id) : Promise.reject("ID is undefined")),
    enabled: !!id,
  });
};

export const useMeetsByOrgId = (orgId: number) => {
  return useQuery({
    queryKey: ["org meets", orgId],
    queryFn: () =>
      orgId
        ? getAllOrgMeets(orgId)
        : Promise.reject("Organization ID is undefined"),
    enabled: !!orgId,
  });
};

export const useParticipants = (participantIds?: string[]) => {
  return useQuery({
    queryKey: ["participants", participantIds],
    queryFn: () => getAllUsersByIds(participantIds || []),
    enabled: !!participantIds && participantIds.length > 0,
  });
};

export const useOrganizer = (organizerId?: string) => {
  return useQuery({
    queryKey: ["organizer by id", organizerId],
    queryFn: () =>
      organizerId
        ? getUserById(organizerId)
        : Promise.reject("Organizer ID is undefined"),
    enabled: !!organizerId,
  });
};

export const useOrganizerOrg = (dispatch: Dispatch, organizerId?: string) => {
  return useQuery({
    queryKey: ["organizerOrg", organizerId],
    queryFn: () =>
      organizerId
        ? fetchOrgById(Number(organizerId), dispatch)
        : Promise.reject("Organizer ID is undefined"),
    enabled: !!organizerId,
  });
};

export const useUsersMeets = (meetIds: number[]) => {
  const dispatch = useDispatch();
  useQuery({
    queryKey: ["users meets", meetIds],
    queryFn: () => getAllMeetsByIds(meetIds, dispatch),
    enabled: Boolean(meetIds.length > 0),
  });
};
export const useMeetsFromMyCountry = (country: string) => {
  return useQuery({
    queryKey: ["meetsFromMyCountry", country],
    queryFn: () => getMeetsByTheCountry(country),
    enabled: !!country,
  });
};

export const useMeetsFromCountries = (selectedCountries: string[]) => {
  return useQuery({
    queryKey: ["meets", selectedCountries],
    queryFn: () => getMeetsByTheCountries(selectedCountries),
  });
};

export const useMeetsByUsersUUID = (uuid: string) => {
  return useQuery({
    queryKey: ["meets", uuid],
    queryFn: () =>
      uuid
        ? getAllMeetsByUserId(uuid)
        : Promise.reject("User UUID is undefined"),
    enabled: !!uuid,
  });
};

export const useOrgMembers = (orgId: number) => {
  return useQuery({
    queryKey: ["orgMembers"],
    queryFn: () => getOrgMembers(orgId),
    enabled: !!orgId,
  });
};

export const useDeleteMeet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meetId: string) => deleteMeet(meetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetsFromMyCountry"] });
      window.location.href = "/";
    },
  });
};

export const useUpdateMemberStatus = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: number }) =>
      updateMembersStatus(id, status),
    onSuccess: () => {
      console.log("Status updated successfully");
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error("Error updating status:", error);
    },
  });
};
export const useUpdateOrganization = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: ({
      orgId,
      update,
    }: {
      orgId: number;
      update: Partial<IOrganization>;
    }) => updateOrg(orgId, update),
    onSuccess: () => {
      console.log("Organization updated successfully");
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error("Error updating organization:", error);
    },
  });
};

export const useCreateMember = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (member: IMember) => createNewMember(member),
    onSuccess: () => {
      console.log("New member created successfully");
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error("Error creating new member:", error);
    },
  });
};

export const useDeleteMember = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (memberId: number) => removeMember(memberId),
    onSuccess: () => {
      console.log("Member removed successfully");
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error("Error removing member:", error);
    },
  });
};
