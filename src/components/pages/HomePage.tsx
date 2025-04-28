import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <Link to="/register" className="text-blue-500 hover:underline">
        Register
      </Link>
    </div>
  );
};

export default HomePage;
