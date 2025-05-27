import { supabase } from "@/lib/supabase";

export const getSearchInformation = async (searchValue: string) => {
  const { data, error } = await supabase
    .from("meets")
    .select("*")
    .or(`name.ilike.%${searchValue}%`);

  if (error) throw error;
  return data;
};

export const getOrgSearchInformation = async (searchValue: string) => {
  const { data, error } = await supabase
    .from("organization")
    .select("*")
    .or(`name.ilike.%${searchValue}%`);

  if (error) throw error;
  return data;
};
