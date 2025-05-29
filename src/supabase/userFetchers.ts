import { USER_TYPES } from "@/constants/userTypes";
import { supabase } from "@/lib/supabase";

export const registerUser = async (email: string, password: string) => {
  console.log("Registering user with email:", email, password);

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

export const loginUser = async (email: string, password: string) => {
  console.log("Logging in user with email:", email, password);
  if (!email || !password) {
    throw new Error("Email and password are required for login.");
  }
  // Check if email and password are provided
  if (!email.trim() || !password.trim()) {
    throw new Error("Email and password cannot be empty.");
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const updateUser = async (updates: object) => {
  const { data, error } = await supabase.auth.updateUser(updates);
  if (error) throw error;
  return data;
};

export const deleteUser = async () => {
  const { error } = await supabase.rpc("delete_user");
  if (error) throw error;
};
// create user
type CreateUserPayload = {
  username: string;
  email: string;
  country: string;
  uuid: string;
};

export const createUser = async (userData: CreateUserPayload) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([userData])
    .select()
    .single();
  if (error) throw error;
  return data;
};
// update user profile
export const updateUserProfile = async (id: string, updates: USER_TYPES) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("uuid", id)
    .select()
    .single();
  if (error) throw error;

  return data;
};
// get user by id
export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("uuid", id)
    .single();
  if (error) throw error;
  return data;
};

export const getAllUsersByIds = async (userIds: string[]) => {
  console.log("userIds", userIds);

  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .in("id", userIds);
  if (error) {
    console.error("Error fetching meets:", error);
    return [];
  }
  if (!users) {
    console.error("No meets found");
    return [];
  }

  return users;
};
export const searchUsersByEmailOrUsername = async (query: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .or(`email.ilike.%${query}%,username.ilike.%${query}%`);

  if (error) throw error;
  return data;
};
