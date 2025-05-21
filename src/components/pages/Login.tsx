import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../UI/Input";
import Button from "../UI/Button";
import DivideLine from "../UI/DivideLine";
import { registerUser, loginUser, createUser } from "@/supabase/userFetchers";
import { storeAuth } from "@/store/authSlice";
import { storeUser } from "@/store/userSlice";
import { supabase } from "@/lib/supabase";
import { RootState } from "@/store";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("dzonicam@gmail.com");
  const [password, setPassword] = useState("@Djalokin3223");
  const [username, setUsername] = useState("ze");
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
      <div className="border py-10 px-20 rounded-md border-gray60">
        <div className="flex justify-between mb-5">
          <div
            onClick={() => setFormType(true)}
            className={`${
              formType && "div-gradient"
            } w-full p-2 flex justify-center items-center text-white cursor-pointer`}
          >
            Login
          </div>
          <div
            onClick={() => setFormType(false)}
            className={`${
              !formType && "div-gradient"
            } w-full p-2 flex justify-center items-center text-white cursor-pointer`}
          >
            Register
          </div>
        </div>
        <DivideLine />
        <form onSubmit={handleSubmit}>
          <div className="flex  flex-col">
            <div>
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
                type="password"
              />
            </div>

            {!formType && (
              <div>
                <Input
                  label="username"
                  placeholder="ze"
                  onChange={setUsername}
                  value={username}
                />
              </div>
            )}
          </div>

          <Button
            disabled={status === "pending"}
            variant="primary"
            wrapperClassName="mt-6 w-full flex justify-center"
            type="submit"
          >
            {formType ? "Login" : "Register"}
          </Button>
        </form>
        <Button
          wrapperClassName="text-[10px]"
          onClick={resendEmail}
          variant="text"
        >
          Re-send confirmation email
        </Button>
      </div>
    </div>
  );
};

export default Login;
