import React from "react";

const TextRow = ({
  label,
  details,
}: {
  label: string;
  details: string | number;
}) => {
  return (
    <div className="text-[18px]">
      <p className="text-white font-bold">
        {label}: <span className="text-gray55 font-normal">{details}</span>
      </p>
    </div>
  );
};

export default TextRow;
