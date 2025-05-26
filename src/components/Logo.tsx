import { logoutUser } from "@/store/userSlice";
import logo from "../assets/logo.svg";
import { removeAuth } from "@/store/authSlice";
import { useDispatch } from "react-redux";

const Logo = () => {
  const dispatch = useDispatch();
  const goHome = () => {
    window.location.href = "/";
  };
  const handleLogout = () => {
    dispatch(removeAuth());
    dispatch(logoutUser(null));
  };
  return (
    <div className="flex items-center ">
      <button onClick={handleLogout}>remove</button>
      <div className="flex items-center gap-4 cursor-pointer" onClick={goHome}>
        <img src={logo} alt="app logo" />
        <div>
          <h1 className="text-gradient font-bold text-2xl">MOTO NEXUS</h1>
          <p className="text-xs text-right">BETA</p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
