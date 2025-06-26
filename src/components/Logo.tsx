import logo from "../assets/logo.svg";
import { logoutUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";

const Logo = () => {
  const dispatch = useDispatch();

  const goHome = () => {
    window.location.href = "/";
  };
  const handleLogout = () => {
    dispatch(logoutUser(null));
  };

  const emergency = localStorage.getItem("emergency") === "true";
  return (
    <div className="flex items-center ">
      {emergency && <button onClick={handleLogout}>remove</button>}
      <div className="flex items-center gap-4 cursor-pointer" onClick={goHome}>
        <img src={logo} alt="app logo" />
        <div>
          <h1 className="text-gradient font-bold text-2xl">MOTO NEXUS</h1>
          <p className="text-xs text-right">BETA / MVP</p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
