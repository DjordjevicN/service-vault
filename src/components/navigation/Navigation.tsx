import NavItem from "./NavItem";

const Navigation = () => {
  return (
    <div className="w-[240px] p-6 h-screen border-r border-gray-300 flex flex-col">
      <NavItem name="Dashboard" url="/" />
      <NavItem name="Meets" url="/meets" status="soon" />
      <NavItem name="Trips" url="/trips" status="soon" disabled />
      <NavItem name="Profile" url="/profile" status="soon" />
    </div>
  );
};

export default Navigation;
