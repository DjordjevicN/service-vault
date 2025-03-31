import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMotorcycle,
  getMotorcycle,
  getMotorcyclesByOwnerId,
} from "../api/motorcycles";
import { Bike } from "@/types/projectTypes";
import { collectionNames } from "@/api/constants";

// Get motorcycle by ID
export const useMotorcycle = (motorcycleId: string) => {
  return useQuery<Bike>({
    queryKey: [collectionNames.motorcycles, motorcycleId],
    queryFn: () => getMotorcycle(motorcycleId),
    enabled: !!motorcycleId,
  });
};

// get motorcycles by currentOwner
export const useMotorcyclesByCurrentOwner = (currentOwner: string) => {
  return useQuery({
    queryKey: [collectionNames.motorcycles, currentOwner],
    queryFn: () => getMotorcyclesByOwnerId(currentOwner),
    enabled: !!currentOwner,
  });
};

// Add a new motorcycle
export const useAddMotorcycle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMotorcycle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [collectionNames.motorcycles],
      });
    },
  });
};
