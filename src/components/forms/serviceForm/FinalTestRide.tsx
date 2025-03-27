import React, { useState } from "react";
import ChecklistNote from "../formInputs/ChecklistNote";
import ChecklistItem from "../formInputs/ChecklistItem";
type FinalTestRideProps = {
  handleChange: (key: string, value: boolean | string) => void;
  serviceList: {
    testRide: boolean;
    testRideNote: string;
    mechanicNote: string;
    nextServiceDate: string;
  };
};

const FinalTestRide: React.FC<FinalTestRideProps> = ({
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
        Final Test Ride & Summary
      </h2>
      {extended && (
        <div>
          <div className="border border-gray-200 p-4 mb-2">
            <ChecklistItem
              id="testRide"
              label="Test Ride Performed"
              checked={serviceList.testRide}
              onChange={(value) => handleChange("testRide", value)}
            />
            <ChecklistNote
              id="testRideNote"
              label="Issues Found During Test Ride"
              onChange={(value) => handleChange("testRideNote", value)}
            />
            <ChecklistNote
              id="mechanicNote"
              label="Additional Notes from Mechanic"
              onChange={(value) => handleChange("mechanicNote", value)}
            />
            <ChecklistNote
              id="nextServiceDate"
              label="Next Service Due Date"
              onChange={(value) => handleChange("nextServiceDate", value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalTestRide;
