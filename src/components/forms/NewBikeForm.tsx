import React from "react";
import { Input } from "../ui/input";
import { addMotorcycle } from "@/api/motorcycles";
import { useUser } from "@/context/AuthContext";

const NewBikeForm = ({ close }: { close: () => void }) => {
  const { user } = useUser();
  const [newBike, setNewBike] = React.useState({
    make: "",
    model: "",
    year: 0,
    color: "",
    mileage: 0,
    engineSize: 0,
    vinNumber: "",
    engineNumber: "",
    image: "",
    location: "",
    owners: [],
    regNumber: "",
    status: "",
  });
  const handleChange = (key: string, value: string | number) => {
    setNewBike((prev) => ({ ...prev, [key]: value }));
  };
  const handleNewBike = async (event: React.FormEvent) => {
    event.preventDefault();
    const newBikeData = {
      ...newBike,
      currentOwner: user?.uid,
      bikeAddedDate: new Date(),
    };
    await addMotorcycle(newBikeData);
    close();
  };
  const labelStyle = "text-gray-500";
  return (
    <div className="pb-10">
      <div
        className="absolute top-20 right-20 cursor-pointer"
        onClick={() => close()}
      >
        Close
      </div>
      <h1 className="text-2xl text-center mb-20 mt-20">Add new motorcycle</h1>
      <div className="max-w-[500px] mx-auto">
        <form onSubmit={handleNewBike}>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="make">
              Make
            </label>
            <Input
              type="text"
              id="make"
              onChange={(value) => handleChange("make", value.target.value)}
              placeholder="Kawasaki"
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="model">
              Model
            </label>
            <Input
              type="text"
              id="model"
              onChange={(value) => handleChange("model", value.target.value)}
              placeholder="Ninja"
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="year">
              Year
            </label>
            <Input
              type="number"
              id="year"
              onChange={(value) => handleChange("year", value.target.value)}
              placeholder="2022"
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="color">
              Color
            </label>
            <Input
              type="text"
              id="color"
              onChange={(value) => handleChange("color", value.target.value)}
              placeholder="Green"
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="mileage">
              Mileage
            </label>
            <Input
              type="number"
              id="mileage"
              onChange={(value) => handleChange("mileage", value.target.value)}
              placeholder="1000"
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="engineSize">
              Engine Size
            </label>
            <Input
              type="number"
              id="engineSize"
              onChange={(value) =>
                handleChange("engineSize", value.target.value)
              }
              placeholder="1000"
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="vinNumber">
              VIN Number
            </label>
            <Input
              type="text"
              id="vinNumber"
              onChange={(value) =>
                handleChange("vinNumber", value.target.value)
              }
              placeholder="JKAEXKH18KDA12345"
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle} htmlFor="engineNumber">
              Engine Number
            </label>
            <Input
              type="text"
              id="engineNumber"
              onChange={(value) =>
                handleChange("engineNumber", value.target.value)
              }
              placeholder="ZX100AE012345"
            />
          </div>
          <div className="mb-4">
            <Input
              type="file"
              id="image"
              onChange={(value) => handleChange("image", value.target.value)}
            />
          </div>

          <button
            className="bg-blue-400 w-full py-3 cursor-pointer"
            type="submit"
          >
            Add new bike
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBikeForm;
