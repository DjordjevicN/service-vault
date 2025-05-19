import { supabase } from "@/lib/supabase";
import { storeUserMeets } from "@/store/meetSlice";

export const getAllMeets = async (dispatch: any) => {
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

// get meets by ids
export const getAllMeetsByIds = async (meetIds: string[], dispatch: any) => {
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
export const createMeet = async (meet: any) => {
  const { data, error } = await supabase.from("meets").insert([meet]);
  if (error) {
    console.error("Error creating meet:", error);
    return null;
  }
  return data;
};
