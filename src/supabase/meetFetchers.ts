import { MeetType } from "@/constants/meetTypes";
import { supabase } from "@/lib/supabase";
import { storeUserMeets } from "@/store/meetSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const getAllMeets = async (dispatch: Dispatch) => {
  const { data: meets, error } = await supabase.from("meets").select("*");
  if (error) {
    console.error("Error fetching meets:", error);
    return [];
  }
  if (!meets) {
    console.error("No meets found");
    return [];
  }
  dispatch(storeUserMeets(meets));
  return meets;
};
export const getAllMeetsByUserId = async (id: string) => {
  const { data: meets, error } = await supabase
    .from("meets")
    .select("*")
    .in("organizerId", [id]);
  if (error) {
    console.error("Error fetching meets:", error);
    return [];
  }
  if (!meets) {
    console.error("No meets found");
    return [];
  }

  return meets;
};

export const getAllMeetsByIds = async (
  meetIds: string[],
  dispatch: Dispatch
) => {
  const { data: meets, error } = await supabase
    .from("meets")
    .select("*")
    .in("id", meetIds);
  if (error) {
    console.error("Error fetching meets:", error);
    return [];
  }
  if (!meets) {
    console.error("No meets found");
    return [];
  }
  dispatch(storeUserMeets(meets));
  return meets;
};
// create new meet
export const createMeet = async (meet: MeetType) => {
  const { data, error } = await supabase.from("meets").insert([meet]).select();
  if (error) {
    console.error("Error creating meet:", error);
    return null;
  }
  return data;
};
// get meet by id
export const fetchMeetById = async (id: string) => {
  const { data, error } = await supabase
    .from("meets")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching meet by id:", error);
    return null;
  }

  return data;
};
export const getMeetsByTheCountry = async (country: string) => {
  const { data, error } = await supabase
    .from("meets")
    .select("*")
    .eq("country", country);
  if (error) {
    console.error("Error fetching meets:", error);
    return [];
  }
  if (!data) {
    console.error("No meets found");
    return [];
  }

  return data;
};
// update meet
export const updateMeet = async (id: number, updates: object) => {
  const { data, error } = await supabase
    .from("meets")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error("Error updating meet:", error);
    return null;
  }

  return data;
};
