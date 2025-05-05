import React from "react";

const Switch = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div
      className={`w-10 h-6 p-1 rounded-full cursor-pointer ${
        isChecked ? "div-gradient" : "bg-gray60"
      } relative`}
      onClick={handleChange}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transition-all duration-300 absolute top-1 ${
          isChecked ? "left-5" : "left-1"
        }`}
      ></div>
    </div>
  );
};

export default Switch;
