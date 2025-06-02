import React, { useState } from "react";

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
import { useLogin, useRegister } from "@/hooks/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { mutate: login } = useLogin();
  const { mutate: register, status } = useRegister();

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
    register(formData);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { email, password };
    const { isValid, errors } = await validateForm(authSchema, formData);
    if (!isValid) return setFormErrors(errors);
    login(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen standardMaxWidth">
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
