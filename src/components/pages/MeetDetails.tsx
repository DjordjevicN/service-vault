import { users } from "@/data/userData";
import UserRow from "./UserRow";
import HostedByCard from "../HostedByCard";
import map from "../../assets/map.png";
import banner from "../../assets/banner.png";
import clock from "../../assets/clock.svg";
import location from "../../assets/gps.svg";
import MeetDetailsAbout from "../MeetDetailsAbout";
import Tags from "./Tags";
import Counter from "../Counter";

const MeetDetails = () => {
  const keywords = [
    { id: "1", tag: "Kawasaki Z 1000" },
    { id: "2", tag: "Kawasaki Z 900" },
    { id: "3", tag: "Kawasaki Z 800" },
    { id: "4", tag: "Kawasaki Z 750" },
    { id: "5", tag: "Kawasaki Z 650" },
    { id: "6", tag: "Kawasaki Z 400" },
    { id: "7", tag: "Kawasaki Z 300" },
  ];
  return (
    <div className="p-6 ">
      <h1 className="text-4xl mb-15 text-white">Belgrade Kawasaki Z Meetup</h1>
      <HostedByCard />
      <div className="w-full h-0.5 bg-gray70 mt-10" />
      <div className="grid grid-cols-[2fr_1fr] gap-4 mt-14">
        <div>
          <MeetDetailsAbout
            title="Details"
            description="Lorem ipsum dolor sit amet consectetur. Sociis habitant consectetur
        libero pellentesque sagittis erat. Consectetur sed aliquet senectus eget
        vestibulum vitae amet mauris. Scelerisque semper eu molestie in arcu.
        Lectus ut aliquam nunc pellentesque ipsum commodo in dictumst. Dictum
        massa arcu consectetur nulla. Dolor in venenatis dolor etiam rhoncus
        dictum quisque consequat venenatis. Iaculis metus aliquet magnis erat.
        Id in odio blandit lectus. Placerat tincidunt tincidunt sit lacus sed
        nullam. Cras duis purus donec est eleifend arcu. Pellentesque magna
        felis turpis nec morbi fermentum donec ac. Amet adipiscing faucibus nunc
        metus ultrices vel. Amet et vulputate lacus nullam facilisis tortor.
        Vitae at nisl nulla orci sit odio ipsum pulvinar."
          />
          <Tags keywords={keywords} />

          <div className="flex gap-9 mt-10">
            <Counter label="total" count={10} />
            <Counter label="pending" count={10} />
            <Counter label="confirmed" count={10} />
          </div>
          <div className="h-96 overflow-auto mt-6">
            {users.map((user) => (
              <UserRow user={user} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full bg-gray80 p-6 rounded">
            <div className="flex justify-between">
              <h2 className="text-white text-xl">Kawasaki Z900 Meet</h2>
              <img
                className="w-[100px] h-[100px]"
                src={banner}
                alt="meet banner"
              />
            </div>
            <div className="w-full h-0.5 bg-gray70 my-4" />
            <div>
              <p className="text-sm text-gray55">Not rated yet</p>
            </div>
          </div>
          <div className="w-full bg-gray80 p-6 rounded flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <img src={clock} alt="clock" className="" />
              <div>
                <p className="text-white">Thursday, May 1, 2025</p>
                <p className="text-white">8:85 PM to 10:45 PM CEST</p>
                <p className="text-gray55">Add to calendar</p>
              </div>
            </div>
            <div className="flex items-start gap-3 ">
              <img src={location} alt="location" />
              <div>
                <p className="text-white">Thursday, May 1, 2025</p>
                <p className="text-gray55">Vladimira Popovica 32 - Beograd</p>
              </div>
            </div>
            <div>
              <p className="text-gray55">Max riders {`${12}`}</p>
            </div>
          </div>
          <div className="w-full bg-gray80 rounded">
            <img src={map} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetDetails;
