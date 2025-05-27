import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, createUser } from "@/supabase/userFetchers";
import { storeAuth } from "@/store/authSlice";
import { storeUser } from "@/store/userSlice";
import { supabase } from "@/lib/supabase";
import { RootState } from "@/store";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Loader2 } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [formType, setFormType] = useState(true);
  const auth = useSelector((state: RootState) => state.auth);
  if (auth) {
    window.location.href = "/";
  }
  const { mutate: createNewUser } = useMutation({
    mutationFn: (newUser: {
      username: string;
      email: string;
      id: string;
      country: string;
    }) => createUser(newUser),
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
          country,
          uuid: data.user.id,
        });
      } else {
        window.location.href = "/";
      }
    },
    onError: (error: Error) => {
      alert(`Auth failed: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger onClick={() => setFormType(true)} value="login">
            Login
          </TabsTrigger>
          <TabsTrigger onClick={() => setFormType(false)} value="register">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your email and password to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  placeholder="**********"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={(e) => handleSubmit(e)}
                disabled={status === "pending"}
              >
                {status === "pending" && (
                  <Loader2 className="mr-2 animate-spin" />
                )}
                Login
              </Button>
            </CardFooter>
            <Button variant="ghost" className="mt-3" onClick={resendEmail}>
              Re-send confirmation email
            </Button>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Create a new account by filling out the form below. A
                confirmation email will be sent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="country">Country</Label>
                <Input
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  placeholder="**********"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={(e) => handleSubmit(e)}
                disabled={status === "pending"}
              >
                {status === "pending" && (
                  <Loader2 className="mr-2 animate-spin" />
                )}
                Register
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
