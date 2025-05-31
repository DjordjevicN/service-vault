import { Button } from "./ui/Button";

const StepController = ({
  section,
  handleReset,
  handlePrevious,
  handleNext,
  maxSection,
  disableNext = false,
}: {
  section: number;
  handleReset: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  maxSection: number;
  disableNext?: boolean;
}) => {
  return (
    <div className="flex gap-4">
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
      {section !== maxSection && (
        <Button disabled={disableNext} onClick={handleNext}>
          Next
        </Button>
      )}
    </div>
  );
};

export default StepController;
