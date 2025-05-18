// supabase/auth.ts
// adjust path

import { supabase } from "@/lib/supabase";

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) throw error;
  return data;
};
