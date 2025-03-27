import React from "react";
import { ServiceFormInit, serviceFormInit } from "./serviceFormInit";
import GeneralInspection from "./GeneralInspection";
import ServiceStart from "./ServiceStart";
import EngineOilSystem from "./EngineOilSystem";
import FuelSystem from "./FuelSystem";
import TransmissionClutch from "./TransmissionClutch";
import ChainSprockets from "./ChainSprockets";
import BrakesWheels from "./BrakesWheels";
import SuspensionSteering from "./SuspensionSteering";
import Electrics from "./Electrics";
import FinalTestRide from "./FinalTestRide";

const ServiceCardForm = () => {
  const [serviceList, setServiceList] =
    React.useState<ServiceFormInit>(serviceFormInit);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newService = {
      ...serviceList,
      currentDate: new Date().toISOString(),
    };
    console.log(newService);
  };

  const handleChange = (key: string, value: boolean | string) => {
    setServiceList((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold text-center">
        Full Motorcycle Service Checklist
      </h1>
      <form onSubmit={handleSubmit}>
        <ServiceStart handleChange={handleChange} />
        <GeneralInspection
          handleChange={handleChange}
          serviceList={serviceList}
        />
        <EngineOilSystem
          handleChange={handleChange}
          serviceList={serviceList}
        />
        <FuelSystem handleChange={handleChange} serviceList={serviceList} />
        <TransmissionClutch
          handleChange={handleChange}
          serviceList={serviceList}
        />
        <ChainSprockets handleChange={handleChange} serviceList={serviceList} />
        <BrakesWheels handleChange={handleChange} serviceList={serviceList} />
        <SuspensionSteering
          handleChange={handleChange}
          serviceList={serviceList}
        />
        <Electrics handleChange={handleChange} serviceList={serviceList} />
        <FinalTestRide handleChange={handleChange} serviceList={serviceList} />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full"
        >
          Submit Service Card
        </button>
      </form>
    </div>
  );
};

export default ServiceCardForm;
