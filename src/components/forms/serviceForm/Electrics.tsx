import React, { useState } from "react";
import ChecklistNote from "../formInputs/ChecklistNote";
import ChecklistItem from "../formInputs/ChecklistItem";
type ElectricsProps = {
  handleChange: (key: string, value: boolean | string) => void;
  serviceList: {
    batteryVoltageCheck: boolean;
    batteryVoltageCheckNote: string;
    lightsTest: boolean;
    hornSwitchCheck: boolean;
    electricalIssuesNote: string;
  };
};

const Electrics: React.FC<ElectricsProps> = ({ handleChange, serviceList }) => {
  const [extended, setExtended] = useState(false);
  const toggleExtended = () => setExtended((prev) => !prev);
  return (
    <div>
      <h2
        className="font-bold text-xl mb-5 cursor-pointer"
        onClick={toggleExtended}
      >
        Electrical System & Lights
      </h2>
      {extended && (
        <div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="batteryVoltageCheck"
              label="Battery Voltage Checked"
              checked={serviceList.batteryVoltageCheck}
              onChange={(value) => handleChange("batteryVoltageCheck", value)}
            />
            <ChecklistNote
              id="batteryVoltageCheckNote"
              label="Voltage Reading (V)"
              onChange={(value) =>
                handleChange("batteryVoltageCheckNote", value)
              }
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="lightsTest"
              label="Lights & Signals Tested"
              checked={serviceList.lightsTest}
              onChange={(value) => handleChange("lightsTest", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="hornSwitchCheck"
              label="Horn & Switches Checked"
              checked={serviceList.hornSwitchCheck}
              onChange={(value) => handleChange("hornSwitchCheck", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistNote
              id="electricalIssuesNote"
              label="Notes on Electrical Issues"
              onChange={(value) => handleChange("electricalIssuesNote", value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Electrics;
