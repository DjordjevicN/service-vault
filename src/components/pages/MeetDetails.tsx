import UserRow from "./UserRow";
import HostedByCard from "../HostedByCard";
import map from "../../assets/map.png";
import banner from "../../assets/banner.png";
import clock from "../../assets/clock.svg";
import location from "../../assets/gps.svg";
import MeetDetailsAbout from "../MeetDetailsAbout";
import Counter from "../Counter";
import Button from "../UI/Button";
import { useParams } from "react-router-dom";
import DivideLine from "../UI/DivideLine";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetById } from "@/api/fetchers/fetchMeets";
import LoadingModal from "../LoadingModal";
import { getDate, getTime } from "../utils/getDates";
import MyMap from "../map/MyMap";
export type userRowType = {
  id: string;
  name: string;
  motorcycle?: string;
  status: string;
  image?: string;
};
const MeetDetails = () => {
  const { id } = useParams();

  const { data: meet, isLoading } = useQuery({
    queryKey: ["meet", id],
    queryFn: () => fetchMeetById(id as string),
    enabled: !!id,
  });
  console.log("meet", meet);

  const handleAttend = () => {
    console.log("Attend button clicked");
  };
  if (isLoading) return <LoadingModal show={isLoading} />;
  const addToCalendar = () => {
    console.log("Add to calendar clicked");
  };

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-baseline">
        <h1 className="text-4xl mb-15 text-white">{meet.name}</h1>
        <Button onClick={handleAttend}>Attend</Button>
      </div>
      <HostedByCard organisedBy={meet.organizerId} />
      <DivideLine className="mt-6" />
      <div className="grid grid-cols-[2fr_1fr] gap-4 mt-14">
        <div>
          <MeetDetailsAbout title="Details" description={meet.description} />

          <div className="flex gap-9 mt-10">
            <Counter label="total" count={10} />
            <Counter label="pending" count={10} />
            <Counter label="confirmed" count={10} />
          </div>
          <div className="h-96 overflow-auto mt-6">
            {meet.participants.map((user: userRowType) => (
              <UserRow key={user.id} user={user} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full bg-gray80 p-6 rounded">
            <div className="flex justify-between">
              <div>
                <h2 className="text-white text-xl">{meet.name}</h2>
              </div>
              <img
                className="w-[100px] h-[100px]"
                src={meet.image ?? banner}
                alt="meet banner"
              />
            </div>
            <div className="w-full h-0.5 bg-gray70 my-4" />
            <div>
              <p className="text-sm text-gray55">
                {meet.starRating || "Not rated yet"}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray80 p-6 rounded flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <img src={clock} alt="clock" className="" />
              <div>
                <p className="text-white">{getDate(meet.startDate)}</p>
                <p className="text-white">{getTime(meet.startTime)}</p>
                <p
                  className="text-gray55 cursor-pointer text-gradient w-fit"
                  onClick={addToCalendar}
                >
                  Add to calendar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 ">
              <img src={location} alt="location" />
              <div>
                <p className="text-white">
                  {meet.location.latitude}-{meet.location.longitude}
                </p>
                <p className="text-gray55">{meet.address}</p>
              </div>
            </div>
            <div>
              <p className="text-white text-xl capitalize">Rules:</p>
            </div>
            <div>
              <p className="text-gray55 capitalize">
                Max riders: {meet.maxRiders}
              </p>
            </div>
            <div>
              <p className="text-gray55 capitalize">
                Ride style: {meet.rideType}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray80 rounded">
            <MyMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetDetails;
