import BasicInfoSection from "@/forms/MeetForms/BasicInfoSection";
import LocationSection from "@/forms/MeetForms/LocationSection";
import TimeAndDateSection from "@/forms/MeetForms/TimeAndDateSection";
import RulesSection from "@/forms/MeetForms/RulesSection";
import MediaSection from "@/forms/MeetForms/MediaSection";
import { useEffect, useState } from "react";
import MeetFormFinish from "@/forms/MeetForms/MeetFormFinish";
import { useDispatch } from "react-redux";
import { resetMeetForm, setEntireMeetForm } from "@/store/meetFormSlice";
import { useParams } from "react-router-dom";
import { useMeetDetails } from "@/hooks/useMeetQueries";
import StepController from "../StepController";

const MeetConfiguration = () => {
  const { meetId } = useParams();
  const { data: meet } = useMeetDetails(meetId);
  const dispatch = useDispatch();
  const [section, setSection] = useState(0);
  useEffect(() => {
    if (!meetId) return;
    dispatch(setEntireMeetForm(meet));
  }, [meetId, dispatch, meet]);

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
    <div>
      {section === 0 && <BasicInfoSection />}
      {section === 1 && <LocationSection />}
      {section === 2 && <TimeAndDateSection />}
      {section === 3 && <RulesSection />}
      {section === 4 && <MediaSection />}
      {section === 5 && <MeetFormFinish isUpdate={!!meetId} />}
      <div className="flex justify-end">
        <StepController
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={5}
        />
      </div>
    </div>
  );
};

export default MeetConfiguration;
