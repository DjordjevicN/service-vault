import { Link } from "react-router-dom";
import google from "../assets/googleIcon.png";
import { signInWithGoogle } from "./utils/signInWithGoogle";
const LoginBox = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="bg-gray80 text-center p-10 rounded border border-gray60">
          <div>
            <button
              className="flex gap-2 px-4 py-2 bg-mainbg rounded cursor-pointer"
              onClick={handleGoogleLogin}
            >
              <img src={google} alt="google" className="w-[24px] h-[24px]" />
              <p className="text-white">Signup with Google</p>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="full bg-gray60 w-full h-[1px]"></div>
            <p className="my-6 text-white">or</p>
            <div className="full bg-gray60 w-full h-[1px]"></div>
          </div>

          <Link to="/login" className="text-gray55 cursor-pointer">
            Continue with email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
