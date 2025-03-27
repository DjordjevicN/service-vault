import { useState } from "react";
import ChecklistItem from "../formInputs/ChecklistItem";
import ChecklistNote from "../formInputs/ChecklistNote";
type GeneralInspectionProps = {
  handleChange: (key: string, value: boolean | string) => void;
  serviceList: {
    visualLeaks: boolean;
    visualLeaksNote: string;
    looseBolts: boolean;
    checkForRust: boolean;
    checkForRustNote: string;
  };
};
const GeneralInspection: React.FC<GeneralInspectionProps> = ({
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
        General Inspection
      </h2>
      {extended && (
        <div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="visualLeaks"
              label="Visual Check for Leaks (Oil, Coolant, Brake Fluid)"
              checked={serviceList.visualLeaks}
              onChange={(value) => handleChange("visualLeaks", value)}
            />
            <ChecklistNote
              id="visualLeakNote"
              label=""
              onChange={(value) => handleChange("visualLeaksNote", value)}
            />
          </div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="looseBolts"
              label="Inspect for Loose Bolts/Nuts (Frame, Engine, Suspension)"
              checked={serviceList.looseBolts}
              onChange={(value) => handleChange("looseBolts", value)}
            />
          </div>

          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="checkForRust"
              label="Check for Rust or Corrosion"
              checked={serviceList.checkForRust}
              onChange={(value) => handleChange("checkForRust", value)}
            />
            <ChecklistNote
              id="checkForRustNote"
              label=""
              onChange={(value) => handleChange("checkForRustNote", value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralInspection;
