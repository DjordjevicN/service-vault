import { supabase } from "@/lib/supabase";

export const registerUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

export const loginUser = async (email: string, password: string) => {
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
  const { error } = await supabase.rpc("delete_user"); // Use Postgres function
  if (error) throw error;
};
// create user
type CreateUserPayload = {
  id: string; // uuid from auth.user
  username: string;
  email: string;
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
export const updateUserProfile = async (id: any, updates: object) => {
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
