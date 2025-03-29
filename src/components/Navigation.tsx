import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-[200px] p-5 border-r h-[100vh]">
      <h1>Navigation</h1>
      <div className="mt-10 flex flex-col gap-5">
        <Link to="/">Dashboard</Link>
        <Link to="/user/1">Profile</Link>
      </div>
    </div>
  );
};

export default Navigation;
