import { removeAuth } from "@/store/authSlice";
import logo from "../assets/logo.svg";
import { logoutUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
const Logo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const goHome = () => {
    window.location.href = "/";
  };
  const handleLogout = () => {
    dispatch(removeAuth());
    dispatch(logoutUser(null));
  };

  const emergency = localStorage.getItem("emergency") === "true";
  return (
    <div className="flex items-center ">
      <p>{t("welcome")}</p>
      {/* <LanguageSwitcher /> */}
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
