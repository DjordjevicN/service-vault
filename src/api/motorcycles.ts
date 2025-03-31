import {
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
  getDocumentByField,
} from "./firestore";

export const getMotorcycle = async (id: string) => {
  return getDocument("motorcycles", id);
};

export const addMotorcycle = async (data: object) => {
  return addDocument("motorcycles", data);
};

export const updateMotorcycle = async (id: string, data: object) => {
  return updateDocument("motorcycles", id, data);
};

export const deleteMotorcycle = async (id: string) => {
  return deleteDocument("motorcycles", id);
};

export const getMotorcyclesByOwnerId = async (id: string) => {
  const motorcycles = await getDocumentByField(
    "motorcycle",
    "currentOwner",
    id
  );
  return motorcycles;
};
