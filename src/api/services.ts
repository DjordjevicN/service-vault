import { collectionNames } from "./constants";
import {
  getDocument,
  getDocumentsByIds,
  addDocument,
  updateDocument,
  deleteDocument,
} from "./firestore";

export const getService = async (id: string) => {
  return getDocument(collectionNames.services, id);
};

export const getServicesByIds = async (ids: string[]) => {
  return getDocumentsByIds(collectionNames.services, ids);
};

export const addService = async (data: object) => {
  return addDocument(collectionNames.services, data);
};

export const updateService = async (id: string, data: object) => {
  return updateDocument(collectionNames.services, id, data);
};

export const deleteService = async (id: string) => {
  return deleteDocument(collectionNames.services, id);
};
