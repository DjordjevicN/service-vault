import BasicInfoSection from "@/forms/MeetForms/BasicInfoSection";
import LocationSection from "@/forms/MeetForms/LocationSection";
import TimeAndDateSection from "@/forms/MeetForms/TimeAndDateSection";
import RulesSection from "@/forms/MeetForms/RulesSection";
import MediaSection from "@/forms/MeetForms/MediaSection";
import { useState } from "react";
import MeetFormFinish from "@/forms/MeetForms/MeetFormFinish";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { resetMeetForm } from "@/store/formsSlice";

const MeetConfiguration = () => {
  const dispatch = useDispatch();
  const [section, setSection] = useState(0);
  const meetForm = useSelector((state: RootState) => state.meetForm);
  console.log("meetForm", meetForm);

  const handleNext = () => {
    if (section === 5) {
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

  const handleReset = () => {
    dispatch(resetMeetForm());
    setSection(0);
  };

  return (
    <div className="p-6">
      {section === 0 && <BasicInfoSection />}
      {section === 1 && <LocationSection />}
      {section === 2 && <TimeAndDateSection />}
      {section === 3 && <RulesSection />}
      {section === 4 && <MediaSection />}
      {section === 5 && <MeetFormFinish />}
      {/* {section === 4 && <ParticipantsSection />} */}

      <div className="flex gap-4">
        {section === 0 && (
          <Button variant="text" onClick={handleReset}>
            Start new Meet
          </Button>
        )}
        {section !== 0 && <Button onClick={handlePrevious}>Previous</Button>}
        {section !== 6 && <Button onClick={handleNext}>Next</Button>}
      </div>
    </div>
  );
};

export default MeetConfiguration;
