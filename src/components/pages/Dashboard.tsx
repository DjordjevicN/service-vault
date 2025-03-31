import BikeCard from "../bike/BikeCard";
import addSvg from "../../assets/svgs/close-circle.svg";
import { useMotorcyclesByCurrentOwner } from "@/hooks/useMotorcycles";
import { useUser } from "@/context/AuthContext";
import { useState } from "react";
import NewBikeForm from "../forms/NewBikeForm";

const Dashboard = () => {
  const { user } = useUser();
  const { data: motorcycles } = useMotorcyclesByCurrentOwner(
    user?.uid as string
  );
  const [newMotorcycleForm, setNewMotorcycleForm] = useState(false);
  console.log(motorcycles);

  const toggleNewMotorcycleForm = () => {
    setNewMotorcycleForm((prev) => !prev);
  };
  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-2">My Motorcycles</h1>
        <div className="flex flex-wrap gap-5 items-center">
          {motorcycles?.map((bike) => {
            return <BikeCard owner bike={bike} key={bike.id} />;
          })}

          <div className="cursor-pointer" onClick={toggleNewMotorcycleForm}>
            <img className="w-10 h-10 rotate-45" src={addSvg} alt="add" />
          </div>
        </div>
      </div>

      {newMotorcycleForm && (
        <div className="fixed w-full h-full bg-white left-0 top-0">
          <NewBikeForm close={toggleNewMotorcycleForm} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
