import BasicInfoSection from "@/forms/MeetForms/BasicInfoSection";

import LocationSection from "@/forms/MeetForms/LocationSection";
import TimeAndDateSection from "@/forms/MeetForms/TimeAndDateSection";
import RulesSection from "@/forms/MeetForms/RulesSection";
import ParticipantsSection from "@/forms/MeetForms/ParticipantsSection";
import MediaSection from "@/forms/MeetForms/MediaSection";
import { useState } from "react";
import MeetFormFinish from "@/forms/MeetForms/MeetFormFinish";
import Button from "../UI/Button";

const MeetConfiguration = () => {
  const [section, setSection] = useState(0);
  console.log(section);

  const handleNext = () => {
    if (section === 6) {
      return;
    }
    setSection((prev) => prev + 1);
  };
  const handlePrevious = () => {
    if (section === 0) {
      return;
    }
    setSection((prev) => prev - 1);
  };
  return (
    <div className="p-6">
      {section === 0 && <BasicInfoSection />}
      {section === 1 && <LocationSection />}
      {section === 2 && <TimeAndDateSection />}
      {section === 3 && <RulesSection />}
      {section === 4 && <ParticipantsSection />}
      {section === 5 && <MediaSection />}
      {section === 6 && <MeetFormFinish />}

      <div className="flex gap-4">
        {section !== 0 && <Button onClick={handlePrevious}>Previous</Button>}
        {section !== 6 && <Button onClick={handleNext}>Next</Button>}
      </div>
    </div>
  );
};

export default MeetConfiguration;
