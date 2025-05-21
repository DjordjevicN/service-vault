import Hero from "../Hero";
import HomeMeets from "../HomeMeets";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const auth = useSelector((state: RootState) => state.auth);

  if (auth && !user) {
    window.location.href = "/edit-profile";
  }
  return (
    <>
      <Hero />
      <HomeMeets />
    </>
  );
};

export default HomePage;
