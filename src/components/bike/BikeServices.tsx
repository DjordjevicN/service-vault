import React from "react";
import SingleServiceCard from "./SingleServiceCard";

const BikeServices = () => {
  const services = [1, 2, 3, 4, 5];
  const addNewService = () => {
    console.log("Add new service");
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="cursor-pointer text-blue-500 mb-5 ml-auto"
          onClick={addNewService}
        >
          + Add new service
        </button>
      </div>
      {services.map((service) => {
        return <SingleServiceCard key={service} />;
      })}
    </div>
  );
};

export default BikeServices;
