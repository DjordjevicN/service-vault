import { collectionNames } from "./../api/constants";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  getService,
  addService,
  updateService,
  deleteService,
  getServicesByIds,
} from "../api/services";

export const useServicesById = (id: string) => {
  return useQuery({
    queryKey: [collectionNames.services, id],
    queryFn: () => getService(id),
  });
};

export const useServicesByIds = (ids: string[]) => {
  return useQuery({
    queryKey: [collectionNames.services, ids],
    queryFn: () => getServicesByIds(ids),
  });
};

export const useAddService = () => {
  return useMutation({
    mutationFn: (data: object) => addService(data),
  });
};

export const useUpdateService = () => {
  return useMutation({
    mutationFn: (data: { id: string; data: object }) =>
      updateService(data.id, data.data),
  });
};

export const useDeleteService = () => {
  return useMutation({
    mutationFn: (id: string) => deleteService(id),
  });
};
