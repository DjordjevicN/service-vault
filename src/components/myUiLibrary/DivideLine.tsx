import React from "react";

const DivideLine = ({ className }: { className?: string }) => {
  return <div className={`w-full h-[1px] bg-gray70 ${className}`}></div>;
};

export default DivideLine;
