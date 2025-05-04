import { Link } from "react-router-dom";

import Hero from "../Hero";
import HomeMeets from "../HomeMeets";
import Footer from "../Footer";

const HomePage = () => {
  return (
    <div className="">
      <Hero />
      <HomeMeets />
      <Footer />
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
