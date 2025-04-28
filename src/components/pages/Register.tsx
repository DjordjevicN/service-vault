import { addUser } from "@/api/userApi";
import { NEW_USER_TYPES } from "@/constants/userTypes";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const Register = () => {
  const { mutate } = useMutation({
    mutationFn: (formData: NEW_USER_TYPES) => addUser(formData),
    onSuccess: () => {
      console.log("User added successfully");
    },
    onError: () => {
      console.log("Error adding user");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      username: (event.target as HTMLFormElement).username.value,
      email: (event.target as HTMLFormElement).email.value,
      password: (event.target as HTMLFormElement).password.value,
    };
    mutate(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div>
        <h1 className="mb-6">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="username">Username:</label>
            <input
              className="border"
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email">Email:</label>
            <input
              className="border"
              type="email"
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
