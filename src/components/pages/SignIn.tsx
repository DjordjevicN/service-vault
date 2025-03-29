import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignIn = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("email"));
    console.log(formData.get("password"));
  };

  return (
    <div className="md:grid md:grid-cols-2 flex justify-center items-center h-screen">
      <div className="hidden md:block">
        <img
          className="object-cover w-full h-[100vh]"
          src="https://images.unsplash.com/photo-1636761358760-101cabeeb699?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-[70%] min-w-[310px] max-w-[300px]  mx-auto px-5">
        <h1>Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-2 w-full"
        >
          <Input
            className="mt-5"
            type="email"
            name="email"
            placeholder="Email"
          />
          <Input
            className="mt-3"
            type="password"
            name="password"
            placeholder="Password"
          />
          <Button className="cursor-pointer mt-3" type="submit">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
