import NavItem from "./NavItem";

const Navigation = () => {
  return (
    <div className="w-[240px] p-6 h-screen border-r border-gray-300">
      <NavItem name="Dashboard" url="/dashboard" />
      <NavItem name="Meets" url="/meets" status="soon" />
      <NavItem name="Trips" url="/trips" status="soon" disabled />
    </div>
  );
};

export default Navigation;
