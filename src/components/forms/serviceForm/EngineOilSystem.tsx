import React, { useState } from "react";
import ChecklistItem from "../formInputs/ChecklistItem";
import ChecklistNote from "../formInputs/ChecklistNote";

type EngineOilSystemProps = {
  handleChange: (key: string, value: boolean | string) => void;
  serviceList: {
    engineOilChange: boolean;
    engineOilChangeNote: string;
    oilFilterChange: boolean;
    sparkPlugChange: boolean;
    sparkPlugChangeNote: string;
    coolantChange: boolean;
    coolantChangeNote: string;
  };
};
const EngineOilSystem: React.FC<EngineOilSystemProps> = ({
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
        Engine & Oil System
      </h2>
      {extended && (
        <div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="engineOilChange"
              label="Engine Oil Changed"
              checked={serviceList.engineOilChange}
              onChange={(value) => handleChange("engineOilChange", value)}
            />
            <ChecklistNote
              id="engineOilChangeNote"
              label="Oil Type & Brand Used"
              onChange={(value) => handleChange("engineOilChangeNote", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="oilFilterChange"
              label="Oil Filter Replaced"
              checked={serviceList.oilFilterChange}
              onChange={(value) => handleChange("oilFilterChange", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="sparkPlugChange"
              label="Spark Plugs Replaced"
              checked={serviceList.sparkPlugChange}
              onChange={(value) => handleChange("sparkPlugChange", value)}
            />
            <ChecklistNote
              id="sparkPlugChangeNote"
              label="Spark Plug Brand & Gap Measurement"
              onChange={(value) => handleChange("sparkPlugChangeNote", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="coolantChange"
              label="Coolant Flushed & Refilled"
              checked={serviceList.coolantChange}
              onChange={(value) => handleChange("coolantChange", value)}
            />
            <ChecklistNote
              id="coolantChangeNote"
              label="Coolant Type Used"
              onChange={(value) => handleChange("coolantChangeNote", value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineOilSystem;
