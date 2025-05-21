import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DivideLine from "../myUiLibrary/DivideLine";
import { registerUser, loginUser, createUser } from "@/supabase/userFetchers";
import { storeAuth } from "@/store/authSlice";
import { storeUser } from "@/store/userSlice";
import { supabase } from "@/lib/supabase";
import { RootState } from "@/store";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [formType, setFormType] = useState(true);
  const auth = useSelector((state: RootState) => state.auth);
  if (auth) {
    window.location.href = "/";
  }
  const { mutate: createNewUser } = useMutation({
    mutationFn: (newUser: { username: string; email: string; id: string }) =>
      createUser(newUser),
    onSuccess: (data) => {
      dispatch(storeUser(data));
    },
    onError: (error) => {
      console.log("Error creating user:", error);
    },
  });

  const { mutate, status } = useMutation({
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
        createNewUser({
          username,
          email,
          uuid: data.user.id,
        });
      } else {
        window.location.href = "/";
      }
    },
    onError: (error: any) => {
      alert(`Auth failed: ${error.message}`);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email, password });
  };
  const resendEmail = async () => {
    await supabase.auth.resend({
      type: "signup",
      email: email,
    });
    alert("Confirmation email sent");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border py-10 px-20 rounded-md">
        <div className="flex justify-between mb-5">
          <div
            onClick={() => setFormType(true)}
            className={`${
              formType && "text-gradient"
            } w-full p-2 flex justify-center items-center cursor-pointer`}
          >
            Login
          </div>
          <div
            onClick={() => setFormType(false)}
            className={`${
              !formType && "text-gradient"
            } w-full p-2 flex justify-center items-center cursor-pointer`}
          >
            Register
          </div>
        </div>
        <DivideLine />
        <form onSubmit={handleSubmit}>
          <div className="flex  flex-col">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
            </div>

            {!formType && (
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
            )}
          </div>

          <Button
            variant="outline"
            disabled={status === "pending"}
            type="submit"
            className="w-full mt-3"
          >
            {formType ? "Login" : "Register"}
          </Button>
        </form>
        <Button variant="ghost" className="mt-3" onClick={resendEmail}>
          Re-send confirmation email
        </Button>
      </div>
    </div>
  );
};

export default Login;
