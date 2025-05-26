import { USER_TYPES } from "@/constants/userTypes";
import { storeUser } from "@/store/userSlice";
import { getUserById } from "@/supabase/userFetchers";
import { AuthUser } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export const useLoggedUser = (auth: AuthUser) => {
  const dispatch = useDispatch();
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUserById(auth.id);
      dispatch(storeUser(data));
      return data;
    },
    enabled: !!auth.id,
  });
};
export const useMeetIdsFromUser = (user: USER_TYPES | null) => {
  return useMemo(() => {
    if (!user) return [];
    return Array.from(
      new Set([
        ...(user.myMeets || []),
        ...(user.favoriteMeets || []),
        ...(user.attendingMeets || []),
      ])
    );
  }, [user]);
};
