import { db } from "../firebase/FirebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export const getCollection = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.error(
      `Document with id ${id} does not exist in collection ${collectionName}`
    );
    return null;
  }
};

// getDocument by uid field
export const getDocumentByField = async (
  collectionName: string,
  fieldName: string,
  fieldValue: string
) => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", fieldValue)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.error(
      `No document found in collection ${collectionName} with ${fieldName} = ${fieldValue}`
    );
    return null;
  }
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
// getDocument by field

export const addDocument = async (collectionName: string, data: object) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return { id: docRef.id, ...data };
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: object
) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

export const getDocumentsByIds = async (
  collectionName: string,
  ids: string[]
) => {
  const q = query(collection(db, collectionName), where("__name__", "in", ids));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
