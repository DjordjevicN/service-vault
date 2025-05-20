import { useQuery } from "@tanstack/react-query";
import {
  fetchMeetById,
  getAllMeetsByIds,
  getMeetsByTheCountry,
} from "@/supabase/meetFetchers";
import { getAllUsersByIds, getUserById } from "@/supabase/userFetchers";
import { useDispatch } from "react-redux";

export const useMeetDetails = (id?: string) => {
  return useQuery({
    queryKey: ["meet", id],
    queryFn: () => (id ? fetchMeetById(id) : Promise.reject("ID is undefined")),
    enabled: !!id,
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

export const useUsersMeets = (meetIds: string[]) => {
  const dispatch = useDispatch();
  useQuery({
    queryKey: ["users meets", meetIds],
    queryFn: () => getAllMeetsByIds(meetIds, dispatch),
    enabled: Boolean(meetIds.length > 0),
  });
};
export const useMeetsFromMyCountry = (country: string) => {
  return useQuery({
    queryKey: ["meetsFromMyCountry"],
    queryFn: () => getMeetsByTheCountry(country),
    enabled: !!country,
  });
};
