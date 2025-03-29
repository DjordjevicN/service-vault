import BikeCard from "../bike/BikeCard";
import { BIKE_MOCK_DATA } from "../mockData/bikeInformation";
import addSvg from "../../assets/svgs/close-circle.svg";
// import { useBikes } from "@/api/bikes";
const myBikes = BIKE_MOCK_DATA;

const Dashboard = () => {
  // const { data: bikes, isLoading, error } = useBikes();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-2">My Motorcycles</h1>
      <div className="flex flex-wrap gap-5 items-center">
        {myBikes.map((bike) => {
          return <BikeCard owner bike={bike} key={bike.id} />;
        })}

        <div className="cursor-pointer">
          <img className="w-10 h-10 rotate-45" src={addSvg} alt="add" />
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-10">My Ex Motorcycles</h1>
      <div className="flex flex-wrap gap-5 items-center">
        {myBikes.map((bike) => {
          return <BikeCard bike={bike} key={bike.id} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
