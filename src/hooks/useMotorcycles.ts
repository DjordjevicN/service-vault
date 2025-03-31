import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
  getMotorcycle,
  getMotorcyclesByOwnerId,
} from "../api/motorcycles";

// Get motorcycle by ID
export const useMotorcycle = (motorcycleId: string) => {
  return useQuery({
    queryKey: ["motorcycle", motorcycleId],
    queryFn: () => getMotorcycle(motorcycleId),
    enabled: !!motorcycleId, // Only run if motorcycleId is defined
  });
};
// get motorcycles by currentOwner

export const useMotorcyclesByCurrentOwner = (currentOwner: string) => {
  return useQuery({
    queryKey: ["motorcycle", currentOwner],
    queryFn: () => getMotorcyclesByOwnerId(currentOwner),
    enabled: !!currentOwner,
  });
};
