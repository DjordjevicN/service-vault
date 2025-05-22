import { Button } from "./ui/button";

const StepController = ({
  section,
  handleReset,
  handlePrevious,
  handleNext,
}: {
  section: number;
  handleReset: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
}) => {
  return (
    <div className="flex gap-4 p-6">
      {section === 0 && (
        <Button variant={"ghost"} onClick={handleReset}>
          Start new Meet
        </Button>
      )}
      {section !== 0 && (
        <Button variant={"ghost"} onClick={handlePrevious}>
          Previous
        </Button>
      )}
      {section !== 5 && <Button onClick={handleNext}>Next</Button>}
    </div>
  );
};

export default StepController;
