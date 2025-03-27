import React, { useState } from "react";
import ChecklistItem from "../formInputs/ChecklistItem";
import ChecklistNote from "../formInputs/ChecklistNote";

type SuspensionSteeringProps = {
  handleChange: (key: string, value: boolean | string) => void;
  serviceList: {
    forkOilChange: boolean;
    forkOilChangeNote: string;
    rearShockInspection: boolean;
    rearShockInspectionNote: string;
  };
};

const SuspensionSteering: React.FC<SuspensionSteeringProps> = ({
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
        Suspension & Steering
      </h2>
      {extended && (
        <div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="forkOilChange"
              label="Fork Oil Changed"
              checked={serviceList.forkOilChange}
              onChange={(value) => handleChange("forkOilChange", value)}
            />
            <ChecklistNote
              id="forkOilChangeNote"
              label="Oil Weight & Brand Used"
              onChange={(value) => handleChange("forkOilChangeNote", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="rearShockInspection"
              label="Rear Shock Inspected"
              checked={serviceList.rearShockInspection}
              onChange={(value) => handleChange("rearShockInspection", value)}
            />
            <ChecklistNote
              id="rearShockInspectionNote"
              label="Notes on Suspension Condition"
              onChange={(value) =>
                handleChange("rearShockInspectionNote", value)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SuspensionSteering;
