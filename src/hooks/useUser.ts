import { MeetType } from "@/constants/meetTypes";
import { USER_TYPES } from "@/constants/userTypes";
import { storeAuth } from "@/store/authSlice";
import { storeUser } from "@/store/userSlice";
import { updateMeet } from "@/supabase/meetFetchers";
import {
  createUser,
  getUserById,
  loginUser,
  registerUser,
  updateUserProfile,
} from "@/supabase/userFetchers";
import { AuthUser } from "@supabase/supabase-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export const useLoggedUser = (auth: AuthUser | null) => {
  const dispatch = useDispatch();
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!auth) return null;
      const data = await getUserById(auth.id);
      dispatch(storeUser(data));
      return data;
    },
    enabled: !!auth && !!auth.id,
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
type NewUser = {
  username: string;
  email: string;
  country: string;
  uuid: string;
};
export const useCreateUser = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (newUser: NewUser) => createUser(newUser),
    onSuccess: (data) => {
      dispatch(storeUser(data));
    },
  });
};
export const useUpdateUser = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({ auth, newUser }: { auth: AuthUser; newUser: USER_TYPES }) =>
      updateUserProfile(auth.id, newUser),
    onSuccess: (data) => {
      dispatch(storeUser(data));
      window.location.href = "/profile";
    },
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      dispatch(storeAuth(data.user));
      window.location.href = "/";
    },
    onError: (error: Error) => {
      console.log("Error logging in:", error);
      alert(`Login failed: ${error.message}`);
    },
  });
};

export const useCreateNewUser = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (newUser: NewUser) => createUser(newUser),
    onSuccess: (data) => {
      dispatch(storeUser(data));
      window.location.href = "/";
    },
    onError: (error: Error) => {
      console.error("Error creating user:", error);
    },
  });
};

type RegisterInput = {
  email: string;
  password: string;
  username: string;
  country: string;
  createNewUser: (user: {
    email: string;
    username: string;
    country: string;
    uuid: string;
  }) => void;
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const createUser = useCreateUser();
  return useMutation({
    mutationFn: async ({
      email,
      password,
      username,
      country,
    }: RegisterInput) => {
      const data = await registerUser(email, password);
      if (!data.user) {
        throw new Error("User registration failed");
      }
      const newUser = {
        username,
        email,
        country,
        uuid: data.user.id,
      };
      createUser.mutate(newUser);
      return data;
    },
    onSuccess: (data) => {
      dispatch(storeAuth(data.user));
      window.location.href = "/";
    },
    onError: (error: Error) => {
      alert(`Auth failed: ${error.message}`);
    },
  });
};

export const useUserAttend = (refetchMeetDetails: () => void) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({
      user,
      meet,
    }: {
      user: USER_TYPES;
      meet: MeetType;
    }) => {
      const updatedUser = await updateUserProfile(user.uuid, {
        ...user,
        attendingMeets: [...(user.attendingMeets ?? []), meet.id || 0],
      });
      const updatedMeet = await updateMeet(Number(meet.id), {
        participants: [...(meet.participants ?? []), user.id],
      });
      return { updatedUser, updatedMeet };
    },
    onSuccess: (data) => {
      dispatch(storeUser(data.updatedUser));
      refetchMeetDetails();
    },
    onError: (error) => {
      console.error("Error attending meet", error);
    },
  });
};
