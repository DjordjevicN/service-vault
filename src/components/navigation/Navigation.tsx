import { logoutUser } from "../../store/userSlice";
import NavItem from "./NavItem";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();
  const isSuperAdmin = true;

  const handleLogout = () => {
    // Implement logout logic here
    console.log("User logged out");
    dispatch(logoutUser(null));
    window.location.href = "/";
  };
  return (
    <div className="w-[240px] p-6 h-screen border-r border-gray-300 flex flex-col">
      <NavItem name="Dashboard" url="/" />
      <NavItem name="Meets" url="/meets" status="soon" />
      <NavItem name="Trips" url="/trips" status="soon" disabled />
      <NavItem name="Profile" url="/profile" status="soon" />
      {isSuperAdmin && (
        <NavItem name="SuperAdmin" url="/superadmin" status="soon" />
      )}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Navigation;
