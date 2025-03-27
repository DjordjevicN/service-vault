import React, { useState } from "react";
import ChecklistNote from "../formInputs/ChecklistNote";
import ChecklistItem from "../formInputs/ChecklistItem";
type BrakesWheelsProps = {
  handleChange: (key: string, value: boolean | string) => void;
  serviceList: {
    brakePadChange: boolean;
    brakePadChangeNote: string;
    brakeFluidChange: boolean;
    brakeFluidChangeNote: string;
    tirePressureCheck: boolean;
    tirePressureCheckNote: string;
    tireChange: boolean;
    tireChangeNote: string;
  };
};

const BrakesWheels: React.FC<BrakesWheelsProps> = ({
  handleChange,
  serviceList,
}) => {
  const [extended, setExtended] = useState(false);
  const toggleExtended = () => setExtended((prev) => !prev);
  return (
    <div>
      <h2
        className="font-bold text-xl mb-5 cursor-pointer"
        onClick={toggleExtended}
      >
        Brakes & Wheels
      </h2>
      {extended && (
        <div>
          {" "}
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="brakePadChange"
              label="Brake Pads Replaced"
              checked={serviceList.brakePadChange}
              onChange={(value) => handleChange("brakePadChange", value)}
            />
            <ChecklistNote
              id="brakePadChangeNote"
              label="Pad Thickness Before & After (mm)"
              onChange={(value) => handleChange("brakePadChangeNote", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="brakeFluidChange"
              label="Brake Fluid Replaced"
              checked={serviceList.brakeFluidChange}
              onChange={(value) => handleChange("brakeFluidChange", value)}
            />
            <ChecklistNote
              id="brakeFluidChangeNote"
              label="Fluid Type Used"
              onChange={(value) => handleChange("brakeFluidChangeNote", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="tirePressureCheck"
              label="Tire Pressure Checked"
              checked={serviceList.tirePressureCheck}
              onChange={(value) => handleChange("tirePressureCheck", value)}
            />
            <ChecklistNote
              id="tirePressureCheckNote"
              label="Front PSI / Rear PSI"
              onChange={(value) => handleChange("tirePressureCheckNote", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="tireChange"
              label="Tires Replaced"
              checked={serviceList.tireChange}
              onChange={(value) => handleChange("tireChange", value)}
            />
            <ChecklistNote
              id="tireChangeNote"
              label="Brand & Model of New Tires"
              onChange={(value) => handleChange("tireChangeNote", value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrakesWheels;
