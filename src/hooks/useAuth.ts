// hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { storeAuth } from "@/store/authSlice";
import { storeUser } from "@/store/userSlice";
import { registerUser, loginUser, createUser } from "@/supabase/userFetchers";

export const useCreateUser = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (newUser: { username: string; email: string; uuid: string }) =>
      createUser(newUser),
    onSuccess: (data) => dispatch(storeUser(data)),
    onError: (error) => console.log("Error creating user:", error),
  });
};

export const useAuth = (formType: boolean, username: string, email: string) => {
  const dispatch = useDispatch();
  const createNewUser = useCreateUser();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) =>
      formType ? loginUser(email, password) : registerUser(email, password),
    onSuccess: (data) => {
      dispatch(storeAuth(data.user));
      if (!formType) {
        createNewUser.mutate({ username, email, uuid: data.user.id });
      } else {
        window.location.href = "/";
      }
    },
    onError: (error: Error) => alert(`Auth failed: ${error.message}`),
  });
};
