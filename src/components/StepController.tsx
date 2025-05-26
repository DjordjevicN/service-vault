import { Button } from "./ui/button";

const StepController = ({
  section,
  handleReset,
  handlePrevious,
  handleNext,
  maxSection,
}: {
  section: number;
  handleReset: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  maxSection: number;
}) => {
  return (
    <div className="flex gap-4 p-6">
      {section === 0 && (
        <Button variant={"ghost"} onClick={handleReset}>
          Reset
        </Button>
      )}
      {section !== 0 && (
        <Button variant={"ghost"} onClick={handlePrevious}>
          Previous
        </Button>
      )}
      {section !== maxSection && <Button onClick={handleNext}>Next</Button>}
    </div>
  );
};

export default StepController;
