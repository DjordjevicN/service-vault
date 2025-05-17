import Hero from "../Hero";
import HomeMeets from "../HomeMeets";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  if (auth && !user) {
    window.location.href = "/edit-profile";
  }
  return (
    <div className="">
      <Hero />
      <HomeMeets />
      <Footer />
    </div>
  );
};

export default HomePage;
