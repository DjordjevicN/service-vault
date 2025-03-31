import { collectionNames } from "./constants";
import {
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
  getDocumentByField,
} from "./firestore";

export const getMotorcycle = async (id: string) => {
  const motorcycle = await getDocument(collectionNames.motorcycles, id);

  if (!motorcycle) {
    throw new Error("Motorcycle not found");
  }
  return motorcycle;
};

export const addMotorcycle = async (data: object) => {
  return addDocument(collectionNames.motorcycles, data);
};

export const updateMotorcycle = async (id: string, data: object) => {
  return updateDocument(collectionNames.motorcycles, id, data);
};

export const deleteMotorcycle = async (id: string) => {
  return deleteDocument(collectionNames.motorcycles, id);
};

export const getMotorcyclesByOwnerId = async (id: string) => {
  const motorcycles = await getDocumentByField(
    collectionNames.motorcycles,
    "currentOwner",
    id
  );
  return motorcycles;
};
