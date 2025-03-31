import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, updateUser, deleteUser, getUser } from "../api/users";
import { collectionNames } from "@/api/constants";

// Get user by ID
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};

// Add a new user
export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collectionNames.users] });
    },
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: object }) =>
      updateUser(userId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collectionNames.users] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [collectionNames.users] });
    },
  });
};
