import { loginUser } from "@/api/userApi";
import { USER_TYPES } from "@/constants/userTypes";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { storeUser } from "../../store/userSlice";
import Input from "../UI/Input";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("ze@gmail.com");
  const [password, setPassword] = useState("123");
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
    mutate({ email, password });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border p-10 rounded-md border-gray60">
        <h1 className="mb-10 text-2xl text-white">Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="email"
            placeholder="example@gmail.com"
            onChange={setEmail}
            value={email}
          />
          <Input
            label="password"
            placeholder="**********"
            onChange={setPassword}
            value={password}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
