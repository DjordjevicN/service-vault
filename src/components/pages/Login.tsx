import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, loginUser, createUser } from "@/supabase/userFetchers";
import { storeAuth } from "@/store/authSlice";
import { storeUser } from "@/store/userSlice";
import { Input } from "@/components/ui/Input";
import { Label } from "../ui/label";
import { Button } from "../ui/Button";
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
import { authSchema, registerSchema } from "@/validation/loginSchema";
import { validateForm } from "@/validation/validateForm";
import { CountrySelect } from "../CountrySelect";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { mutate: createNewUser } = useMutation({
    mutationFn: (newUser: {
      username: string;
      email: string;
      country: string;
      uuid: string;
    }) => createUser(newUser),
    onSuccess: (data) => {
      dispatch(storeUser(data));
      window.location.href = "/";
    },
    onError: (error) => {
      console.log("Error creating user:", error);
    },
  });

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      dispatch(storeAuth(data.user));
      window.location.href = "/";
    },
    onError: (error) => {
      console.log("Error logging in:", error);
      alert(`Login failed: ${error.message}`);
    },
  });

  const { mutate: register, status } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => registerUser(email, password),
    onSuccess: (data) => {
      dispatch(storeAuth(data.user));
      createNewUser({
        username,
        email,
        country,
        uuid: data.user.id,
      });
    },
    onError: (error: Error) => {
      alert(`Auth failed: ${error.message}`);
    },
  });
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { email, password, username, country };
    const { isValid, errors } = await validateForm(registerSchema, formData);
    if (!isValid) return alert(Object.values(errors).join("\n"));
    register({ email, password });
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { email, password };
    const { isValid, errors } = await validateForm(authSchema, formData);
    if (!isValid) return setFormErrors(errors);
    login({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onKeyDown={handleKeyDown}>
            Login
          </TabsTrigger>
          <TabsTrigger value="register" onKeyDown={handleKeyDown}>
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
                  type="email"
                  error={formErrors.email ? formErrors.email : undefined}
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
                onClick={(e) => handleLogin(e)}
                disabled={status === "pending"}
              >
                {status === "pending" && (
                  <Loader2 className="mr-2 animate-spin" />
                )}
                Login
              </Button>
            </CardFooter>
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
                <CountrySelect onSelect={(code) => setCountry(code)} />
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
                onClick={(e) => handleRegister(e)}
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
