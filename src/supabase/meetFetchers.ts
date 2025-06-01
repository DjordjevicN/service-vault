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
export const getAllMeetsByUserId = async (id: number | string) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const isoDate = sevenDaysAgo.toISOString();
  const { data: meets, error } = await supabase
    .from("meets")
    .select("*")
    .in("organizerId", [id])
    .gt("startDate", isoDate); // keep meets newer than 7 days ago
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
export const getAllOrgMeets = async (id: number) => {
  const { data: meets, error } = await supabase
    .from("meets")
    .select("*")
    .in("organizationId", [id]);
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
  meetIds: number[],
  dispatch: Dispatch
) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const isoDate = sevenDaysAgo.toISOString();

  const { data: meets, error } = await supabase
    .from("meets")
    .select("*")
    .in("id", meetIds)
    .gt("startDate", isoDate); // keep meets newer than 7 days ago

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
export const getMeetsByTheCountries = async (countries: string[]) => {
  const { data, error } = await supabase
    .from("meets")
    .select("*")
    .in("country", countries);
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

export const deleteMeet = async (id: string) => {
  // 1. Remove the meet
  const { error: deleteError } = await supabase
    .from("meets")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Error deleting meet:", deleteError);
    return null;
  }

  // 2. Get all users attending this meet
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("id, attendingMeets");

  if (usersError) {
    console.error("Error fetching profiles:", usersError);
    return null;
  }

  // 3. Filter and update users who are attending the deleted meet
  const affectedUsers = users.filter((user) =>
    user.attendingMeets?.includes(id)
  );

  for (const user of affectedUsers) {
    const updatedMeets = user.attendingMeets.filter(
      (meetId: string) => meetId !== id
    );

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ attendingMeets: updatedMeets })
      .eq("id", user.id);

    if (updateError) {
      console.error(`Error updating user ${user.id}:`, updateError);
      // continue updating others instead of returning
    }
  }

  return { success: true };
};

export const getMeetsByDate = async (date: string | undefined) => {
  const { data, error } = await supabase
    .from("meets")
    .select("*")
    .eq("startDate", date);
  if (error) {
    console.error("Error fetching meets by date:", error);
    return [];
  }
  if (!data) {
    console.error("No meets found for the specified date");
    return [];
  }

  return data;
};

export const getMeetsByFilterQuery = async (
  selectedCountry: string,
  userCountry: string,
  selectedCity: string,
  selectedType: string,
  showAllMeets: boolean
) => {
  let query = supabase
    .from("meets")
    .select("*")
    .order("startDate", { ascending: true });

  if (!showAllMeets) {
    // If not showing all meets, filter by country, city, type
    if (selectedCountry) {
      query = query.eq("country", selectedCountry);
    } else if (userCountry) {
      query = query.eq("country", userCountry);
    }

    if (selectedCity) {
      query = query.eq("city", selectedCity);
    }

    if (selectedType) {
      query = query.eq("type", selectedType);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching meets by filter query:", error);
    return [];
  }

  if (!data) {
    console.error("No meets found for the filter query");
    return [];
  }

  return data;
};
