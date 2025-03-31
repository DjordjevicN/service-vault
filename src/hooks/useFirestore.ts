// import { useQuery } from "@tanstack/react-query";
// import { fetchUsers, fetchMotorcycles, fetchServices } from "@/api/collections";

// // Fetch all users
// export const useUsers = () => {
//   return useQuery({
//     queryKey: ["users"],
//     queryFn: fetchUsers,
//   });
// };

// // Fetch all motorcycles
// export const useMotorcycles = () => {
//   return useQuery({
//     queryKey: ["motorcycles"],
//     queryFn: fetchMotorcycles,
//   });
// };

// // Fetch all services
// export const useServices = () => {
//   return useQuery({
//     queryKey: ["services"],
//     queryFn: fetchServices,
//   });
// };

// // Fetch all collections in sequence (if needed)
// export const useAllData = () => {
//   const usersQuery = useUsers();
//   const motorcyclesQuery = useMotorcycles();
//   const servicesQuery = useServices();

//   return {
//     users: usersQuery.data,
//     motorcycles: motorcyclesQuery.data,
//     services: servicesQuery.data,
//     isLoading: usersQuery.isLoading || motorcyclesQuery.isLoading || servicesQuery.isLoading,
//     error: usersQuery.error || motorcyclesQuery.error || servicesQuery.error,
//   };
// };
