import { addUser, loginUser } from "@/api/userApi";
import { NEW_USER_TYPES } from "@/constants/userTypes";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { storeUser } from "../../store/userSlice";
import Input from "../UI/Input";
import Button from "../UI/Button";
import DivideLine from "../UI/DivideLine";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("ze@gmail.com");
  const [password, setPassword] = useState("123");
  const [username, setUsername] = useState("ze");
  const [confirmPassword, setConfirmPassword] = useState("123");
  const [formType, setFormType] = useState(true);

  const { mutate } = useMutation({
    mutationFn: (formData: NEW_USER_TYPES) =>
      formType ? loginUser(formData) : addUser(formData),
    onSuccess: (data) => {
      dispatch(storeUser(data.user));
      window.location.href = "/";
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formType) {
      mutate({ email, password });
    } else {
      mutate({ email, password, username });
    }
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
                  label="confirm password"
                  placeholder="**********"
                  onChange={setConfirmPassword}
                  value={confirmPassword}
                  type="password"
                />
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
            variant="primary"
            classname="mt-6 w-full flex justify-center "
            type="submit"
          >
            {formType ? "Login" : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
