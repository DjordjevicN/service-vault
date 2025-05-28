import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import homepageBg from "@/assets/homepageBg.png";
import Logo from "../Logo";
import Footer from "../Footer";

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const auth = useSelector((state: RootState) => state.auth);

  if (auth && !user) {
    window.location.href = "/edit-profile";
  }
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <Logo />
        <Link to="/login">Login / Register</Link>
      </div>
      <h1 className="text-6xl font-bold mt-32 text-center">
        Organize Rides & Ride Together.
      </h1>
      <p className="mt-10 text-center text-lg max-w-6xl mx-auto text-gray80 ">
        MotoNexus is a modern platform designed for motorcycle enthusiasts to
        effortlessly organize meetups, create travel plans, and collaborate
        within riding organizations. Whether you're hosting local meetups or
        planning a multi-day road trip, MotoNexus helps you keep everything in
        sync — from dates and participants to gear and hotel bookings.
      </p>
      <Link to="/login" className="flex justify-center mt-10">
        <Button variant="ghost" className="button-gradient">
          Get Started
        </Button>
      </Link>
      <div className="flex justify-center mt-44 ">
        <div className="box-gradient w-fit">
          <img src={homepageBg} alt="" />
        </div>
      </div>

      <div className="clan  mt-32">
        <h2 className="text-5xl font-semibold text-center">
          What Can You Do With MotoNexus?
        </h2>
        <p className="mt-10 text-center text-lg max-w-6xl mx-auto text-gray80 ">
          Whether you're planning a quick local ride or a cross-country
          adventure, MotoNexus gives you the tools to coordinate every detail.
          Built with riders in mind, every feature is designed to make planning
          simple, social, and stress-free. Here’s what MotoNexus can do for you:
        </p>
      </div>

      <div className="flex items-center mt-52 gap-16">
        <div>
          <h3 className="text-2xl text-gray80 font-semibold">
            Effortless Ride Meetups
          </h3>
          <p className="text-gray80 mt-5">
            Create, join, and manage motorcycle meetups with ease. Whether it's
            a casual weekend ride or a large community event, MotoNexus lets
            you:
          </p>
          <ul className="text-gray80 mt-2">
            <li>- Schedule meetups with precise dates</li>
            <li>- Control who can attend (open or by invitation)</li>
            <li>
              - Track RSVP status of each rider? Pair this with location pins
              and time slots — <br /> and you're good to go.
            </li>
          </ul>
        </div>
        <div className="box-gradient-3 w-fit">
          <img className="max-w-[600px]" src={homepageBg} alt="" />
        </div>
      </div>

      <div className="flex flex-row-reverse items-center mt-52 gap-16">
        <div>
          <h3 className="text-2xl text-gray80 font-semibold">
            Structure Through Riding Organizations
          </h3>
          <p className="text-gray80 mt-5">
            Form or join motorcycle organizations to ride with your crew. Within
            each organization, you can:
          </p>
          <ul className="text-gray80 mt-2">
            <li>- Manage members and assign roles</li>
            <li>- Create meetups on behalf of the organization</li>
            <li>
              - Restrict events to specific members <br />A single rider can be
              part of multiple groups — ride with friends, clubs, or national
              teams.
            </li>
          </ul>
        </div>
        <div className="box-gradient-2 w-fit">
          <img className="max-w-[600px]" src={homepageBg} alt="" />
        </div>
      </div>

      <div className="flex items-center mt-52 gap-16">
        <div>
          <h3 className="text-2xl text-gray80 font-semibold">
            Advanced Trip Planning (Coming Soon)
          </h3>
          <p className="text-gray80 mt-5">
            Trips are multi-day ride events with deep planning capabilities.
            Perfect for cross-country tours, these allow you to:
          </p>
          <ul className="text-gray80 mt-2">
            <li>- Plan each day of the ride with routes and stops</li>
            <li>- See who's riding and what they’re bringing</li>
            <li>- Organize sleeping arrangements (who sleeps with whom)</li>
            <li>
              - Add hotels, ferry tickets, tolls — and split the costs
              automatically
            </li>
            <li>
              - Add tasks and responsibilities (who brings tools, gear, food)
            </li>
            <li>
              - Track everyone's location and nearby mechanics <br />
              RideMeet turns chaos into clarity for your next big adventure.
            </li>
          </ul>
        </div>
        <div className="box-gradient-3 w-fit">
          <img className="max-w-[600px]" src={homepageBg} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
