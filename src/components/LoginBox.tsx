import google from "../assets/googleIcon.png";
const LoginBox = () => {
  const handleGoogleLogin = () => {
    console.log("Google login");
  };
  const handleEmailLogin = () => {
    console.log("Email login");
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
              <img src={google} alt="google" />
              <p className="text-white">Signup with Google</p>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="full bg-gray60 w-full h-[1px]"></div>
            <p className="my-6 text-white">or</p>
            <div className="full bg-gray60 w-full h-[1px]"></div>
          </div>
          <button
            className="text-gray55 cursor-pointer"
            onClick={handleEmailLogin}
          >
            Continue with email
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
