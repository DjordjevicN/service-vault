import React, { useState } from "react";
import ChecklistNote from "../formInputs/ChecklistNote";
import ChecklistItem from "../formInputs/ChecklistItem";
type ChainSprocketsProps = {
  handleChange: (key: string, value: boolean | string) => void;
  serviceList: {
    chainLubrication: boolean;
    chainLubricationNote: string;
    sprocketInspection: boolean;
    sprocketInspectionNote: string;
  };
};

const ChainSprockets: React.FC<ChainSprocketsProps> = ({
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
        Chain & Sprockets
      </h2>
      {extended && (
        <div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="chainLubrication"
              label="Chain/Belt Lubricated"
              checked={serviceList.chainLubrication}
              onChange={(value) => handleChange("chainLubrication", value)}
            />
            <ChecklistNote
              id="chainLubricationNote"
              label="Chain Slack Measurement (in mm)"
              onChange={(value) => handleChange("chainLubricationNote", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="sprocketInspection"
              label="Sprockets Inspected for Wear"
              checked={serviceList.sprocketInspection}
              onChange={(value) => handleChange("sprocketInspection", value)}
            />
            <ChecklistNote
              id="sprocketInspectionNote"
              label="Notes on Chain/Sprocket Wear"
              onChange={(value) =>
                handleChange("sprocketInspectionNote", value)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainSprockets;
