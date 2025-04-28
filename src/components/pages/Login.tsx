import { loginUser } from "@/api/userApi";
import { USER_TYPES } from "@/constants/userTypes";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import { storeUser } from "../../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  type loginData = Pick<USER_TYPES, "email" | "password">;
  const { mutate } = useMutation({
    mutationFn: (formData: loginData) => loginUser(formData),
    onSuccess: (data) => {
      dispatch(storeUser(data.user));
      window.location.href = "/";
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      email: (event.target as HTMLFormElement).email.value,
      password: (event.target as HTMLFormElement).password.value,
    };
    mutate(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-10">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">email:</label>
          <input
            className="border"
            type="text"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password">Password:</label>
          <input
            className="border"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
