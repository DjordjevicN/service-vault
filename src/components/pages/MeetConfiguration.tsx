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
import TopSteper from "../TopSteper";

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
  const stepLabels = [
    "Basic Info",
    "Location",
    "Time & Date",
    "Rules",
    "Media",
    "Finish",
  ];
  return (
    <div>
      <TopSteper
        section={section}
        handleNext={handleNext}
        handleReset={handleReset}
        handlePrevious={handlePrevious}
        maxSection={5}
        onStepClick={(step) => setSection(step)}
        stepLabels={stepLabels}
      />
      {section === 0 && (
        <BasicInfoSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={5}
        />
      )}
      {section === 1 && (
        <LocationSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={5}
        />
      )}
      {section === 2 && (
        <TimeAndDateSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={5}
        />
      )}
      {section === 3 && (
        <RulesSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={5}
        />
      )}
      {section === 4 && (
        <MediaSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={5}
        />
      )}
      {section === 5 && (
        <MeetFormFinish
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={5}
          isUpdate={!!meetId}
        />
      )}
      <div className="flex justify-end"></div>
    </div>
  );
};

export default MeetConfiguration;
