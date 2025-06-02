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
  const dispatch = useDispatch();
  const { meetId } = useParams();
  const [section, setSection] = useState(0);
  const { data: meet } = useMeetDetails(meetId);

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
  const maxSection = 5;
  return (
    <div className="standardMaxWidth">
      <TopSteper
        section={section}
        handleNext={handleNext}
        handleReset={handleReset}
        handlePrevious={handlePrevious}
        maxSection={maxSection}
        onStepClick={(step) => setSection(step)}
        stepLabels={stepLabels}
      />
      {section === 0 && (
        <BasicInfoSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={maxSection}
        />
      )}
      {section === 1 && (
        <LocationSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={maxSection}
        />
      )}
      {section === 2 && (
        <TimeAndDateSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={maxSection}
        />
      )}
      {section === 3 && (
        <RulesSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={maxSection}
        />
      )}
      {section === 4 && (
        <MediaSection
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={maxSection}
        />
      )}
      {section === 5 && (
        <MeetFormFinish
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={maxSection}
          isUpdate={!!meetId}
        />
      )}
    </div>
  );
};

export default MeetConfiguration;
