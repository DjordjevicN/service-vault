import { useQuery } from "@tanstack/react-query";
import { fetchMeetById } from "@/supabase/meetFetchers";
import { getAllUsersByIds, getUserById } from "@/supabase/userFetchers";

export const useMeetDetails = (id?: string) => {
  return useQuery({
    queryKey: ["meet", id],
    queryFn: () => fetchMeetById(id),
    enabled: !!id,
  });
};

export const useParticipants = (participantIds?: string[]) => {
  return useQuery({
    queryKey: ["participants", participantIds],
    queryFn: () => getAllUsersByIds(participantIds),
    enabled: !!participantIds && participantIds.length > 0,
  });
};

export const useOrganizer = (organizerId?: string) => {
  return useQuery({
    queryKey: ["organizer by id", organizerId],
    queryFn: () => getUserById(organizerId),
    enabled: !!organizerId,
  });
};
