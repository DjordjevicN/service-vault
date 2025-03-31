import {
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
  getDocumentByField,
} from "./firestore";

export const getUser = async (id: string) => {
  return getDocument("users", id);
};

export const getUserByUID = async (uid: string) => {
  return getDocumentByField("users", "uid", uid);
};

export const addUser = async (data: object) => {
  return addDocument("users", data);
};

export const updateUser = async (id: string, data: object) => {
  return updateDocument("users", id, data);
};

export const deleteUser = async (id: string) => {
  return deleteDocument("users", id);
};
