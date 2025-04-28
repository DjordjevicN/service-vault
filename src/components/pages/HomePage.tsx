import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>HOME PAGE</h1>
      <Link to="/register" className="text-blue-500 hover:underline">
        Register
      </Link>
      <Link to="/login" className="text-blue-500 hover:underline">
        login
      </Link>
    </div>
  );
};

export default HomePage;
