import { Button } from "@/components/ui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import google from "../../assets/google.svg";
import { useUser } from "@/context/AuthContext";
import { addUser, getUserByUID } from "@/api/users";

type GoogleUser = {
  email: string;
  uid: string;
  displayName: string;
  photoURL?: string;
};
const SignIn = () => {
  const { setUser } = useUser();

  const checkBabylonForUser = async (user: GoogleUser) => {
    const userInDatabase = await getUserByUID(user.uid);

    if (!userInDatabase) {
      const newUser = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        address: "",
        city: "",
        country: "",
        motorcyclesInThePast: [],
        motorcyclesOwned: [],
        phoneNumber: "",
        role: "user",
        status: "active",
        zipCode: "",
      };
      const addedUser = await addUser(newUser);
      console.log("addedUser", addedUser);
      setUser(addedUser);
    } else {
      setUser(userInDatabase[0]);
    }
  };

  const handleGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const googleProvider = await new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, googleProvider);

    if (user) {
      checkBabylonForUser(user as GoogleUser);
    }
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
        <Button onClick={handleGoogle} className="cursor-pointer mt-3 w-full">
          <img className="w-5 h-5" src={google} alt="google" />
          <p>Sign In with Google</p>
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
