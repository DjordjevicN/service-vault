import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StepController from "../StepController";

const OrgConfiguration = () => {
  const dispatch = useDispatch();
  const [section, setSection] = useState(0);

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
    // dispatch(resetMeetForm());
    setSection(0);
  };
  //   useEffect(() => {
  //     if (!meetId) return;
  //     dispatch(setEntireMeetForm(meet));
  //   }, [meetId, dispatch, meet]);

  return (
    <div>
      <div>
        {/* {section === 0 && <BasicInfoSection />}
        {section === 1 && <LocationSection />}
        {section === 2 && <TimeAndDateSection />}
        {section === 3 && <RulesSection />}
        {section === 4 && <MediaSection />} */}
      </div>
      <StepController
        section={section}
        handleNext={handleNext}
        handleReset={handleReset}
        handlePrevious={handlePrevious}
      />
    </div>
  );
};

export default OrgConfiguration;
