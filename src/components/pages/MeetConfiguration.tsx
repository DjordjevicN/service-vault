import BasicInfoSection from "@/forms/MeetForms/BasicInfoSection";
import LocationSection from "@/forms/MeetForms/LocationSection";
import TimeAndDateSection from "@/forms/MeetForms/TimeAndDateSection";
import RulesSection from "@/forms/MeetForms/RulesSection";
import MediaSection from "@/forms/MeetForms/MediaSection";
import { useEffect, useState } from "react";
import MeetFormFinish from "@/forms/MeetForms/MeetFormFinish";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { resetMeetForm, setEntireMeetForm } from "@/store/formsSlice";
import { useParams } from "react-router-dom";
import { useMeetDetails } from "@/hooks/useMeetQueries";

const MeetConfiguration = () => {
  const { meetId } = useParams();
  const { data: meet, isLoading } = useMeetDetails(meetId);
  console.log(meet);
  console.log(isLoading);
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
    <div className="p-6">
      {section === 0 && <BasicInfoSection />}
      {section === 1 && <LocationSection />}
      {section === 2 && <TimeAndDateSection />}
      {section === 3 && <RulesSection />}
      {section === 4 && <MediaSection />}
      {section === 5 && <MeetFormFinish isUpdate={!!meetId} />}
      {/* {section === 4 && <ParticipantsSection />} */}

      <div className="flex gap-4">
        {section === 0 && (
          <Button variant="text" onClick={handleReset}>
            Start new Meet
          </Button>
        )}
        {section !== 0 && <Button onClick={handlePrevious}>Previous</Button>}
        {section !== 5 && <Button onClick={handleNext}>Next</Button>}
      </div>
    </div>
  );
};

export default MeetConfiguration;
