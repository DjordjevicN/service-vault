import React from "react";
import { Button } from "./ui/Button";

type TopSteperProps = {
  section: number;
  maxSection: number;
  handleNext: () => void; // You might not need these here but keeping for completeness
  handlePrevious: () => void;
  handleReset: () => void;
  onStepClick?: (step: number) => void;
};

const stepLabels = [
  "Basic Info",
  "Location",
  "Time & Date",
  "Rules",
  "Media",
  "Finish",
];

const TopSteper: React.FC<TopSteperProps> = ({
  section,
  maxSection,
  onStepClick,
}) => {
  return (
    <div className="flex justify-center gap-4 mt-2">
      {stepLabels.slice(0, maxSection + 1).map((label, index) => {
        const isActive = index === section;

        return (
          <Button
            variant="ghost"
            key={index}
            onClick={() => onStepClick && onStepClick(index)}
            className={`
            
              ${isActive ? " text-white" : " text-muted-foreground"}
              transition
              select-none
              text-sm
             
            `}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default TopSteper;
