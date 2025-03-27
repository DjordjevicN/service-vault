import React, { useState } from "react";
import ChecklistItem from "../formInputs/ChecklistItem";
import ChecklistNote from "../formInputs/ChecklistNote";
type TransmissionClutchProps = {
  handleChange: (key: string, value: boolean | string) => void;
  serviceList: {
    clutchAdjust: boolean;
    clutchAdjustNote: string;
    transmissionFluidCheck: boolean;
    transmissionFluidCheckNote: string;
  };
};
const TransmissionClutch: React.FC<TransmissionClutchProps> = ({
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
        Transmission & Clutch
      </h2>
      {extended && (
        <div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="clutchAdjust"
              label="Clutch Adjusted"
              checked={serviceList.clutchAdjust}
              onChange={(value) => handleChange("clutchAdjust", value)}
            />
            <ChecklistNote
              id="clutchAdjustNote"
              label="Clutch Free Play (in mm)"
              onChange={(value) => handleChange("clutchAdjustNote", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="transmissionFluidCheck"
              label="Transmission Fluid Checked"
              checked={serviceList.transmissionFluidCheck}
              onChange={(value) =>
                handleChange("transmissionFluidCheck", value)
              }
            />
            <ChecklistNote
              id="transmissionFluidCheckNote"
              label="Notes on Gearbox/Transmission Condition"
              onChange={(value) =>
                handleChange("transmissionFluidCheckNote", value)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransmissionClutch;
