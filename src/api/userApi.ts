import {
  LOGIN_USER_TYPES,
  NEW_USER_TYPES,
  USER_TYPES,
} from "@/constants/userTypes";
import axios from "axios";

export const getUsers = async () => {
  const response = await axios.get("http://localhost:3000/users/all-users");
  return response.data;
};
export const addUser = async (user: NEW_USER_TYPES) => {
  const response = await axios.post(
    "http://localhost:3000/users/register",
    user
  );
  return response.data;
};
export const loginUser = async (user: LOGIN_USER_TYPES) => {
  const response = await axios.post("http://localhost:3000/users/login", user);
  return response.data;
};
export const updateUser = async (user: USER_TYPES) => {
  const response = await axios.put(
    `http://localhost:3000/users/update-user/${user.id}`,
    user
  );
  return response.data;
};
