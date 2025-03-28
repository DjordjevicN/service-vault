import React from "react";
import { Input } from "../ui/input";

const NewBikeForm = () => {
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
  });
  const handleChange = (key: string, value: string | number) => {
    setNewBike((prev) => ({ ...prev, [key]: value }));
  };
  const handleNewBike = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(newBike);
  };
  const labelStyle = "text-gray-500";
  return (
    <div className="pb-10">
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
