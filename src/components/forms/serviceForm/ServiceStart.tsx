import React, { useState } from "react";
import ChecklistNote from "../formInputs/ChecklistNote";
type ServiceStartProps = {
  handleChange: (key: string, value: boolean | string) => void;
};
const ServiceStart: React.FC<ServiceStartProps> = ({ handleChange }) => {
  const [extended, setExtended] = useState(false);
  const toggleExtended = () => setExtended((prev) => !prev);
  return (
    <div>
      <h2
        className="font-bold text-xl mb-5 cursor-pointer"
        onClick={toggleExtended}
      >
        Service Information
      </h2>
      {extended && (
        <div>
          <ChecklistNote
            id="serviceMilage"
            label=""
            onChange={(value) => handleChange("serviceMilage", value)}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceStart;
