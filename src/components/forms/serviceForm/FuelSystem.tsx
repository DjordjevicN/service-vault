import React, { useState } from "react";
import ChecklistItem from "../formInputs/ChecklistItem";
import ChecklistNote from "../formInputs/ChecklistNote";
type FuelSystemProps = {
  handleChange: (key: string, value: boolean | string) => void;
  serviceList: {
    fuelFilterChange: boolean;
    fuelInjectorChange: boolean;
    fuelInjectorChangeNote: string;
  };
};
const FuelSystem: React.FC<FuelSystemProps> = ({
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
        Fuel System
      </h2>
      {extended && (
        <div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="fuelFilterChange"
              label="Fuel Filter Replaced"
              checked={serviceList.fuelFilterChange}
              onChange={(value) => handleChange("fuelFilterChange", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="fuelInjectorChange"
              label="Fuel Injectors Cleaned or Replaced"
              checked={serviceList.fuelInjectorChange}
              onChange={(value) => handleChange("fuelInjectorChange", value)}
            />
            <ChecklistNote
              id="fuelInjectorChangeNote"
              label="Notes on Fuel System Condition"
              onChange={(value) =>
                handleChange("fuelInjectorChangeNote", value)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelSystem;
