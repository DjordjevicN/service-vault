import BikeCard from "../bike/BikeCard";
import addSvg from "../../assets/svgs/close-circle.svg";
import { useMotorcyclesByCurrentOwner } from "@/hooks/useMotorcycles";
import { useUser } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useUser();
  const { data: motorcycles } = useMotorcyclesByCurrentOwner(
    user?.uid as string
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-2">My Motorcycles</h1>
      <div className="flex flex-wrap gap-5 items-center">
        {motorcycles?.map((bike) => {
          return <BikeCard owner bike={bike} key={bike.id} />;
        })}

        <div className="cursor-pointer">
          <img className="w-10 h-10 rotate-45" src={addSvg} alt="add" />
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-10">My Ex Motorcycles</h1>
      <div className="flex flex-wrap gap-5 items-center">
        {motorcycles?.map((bike) => {
          return <BikeCard bike={bike} key={bike.id} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
