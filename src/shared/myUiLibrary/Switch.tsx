import React from "react";
const Switch = ({ onChange }: { onChange: (value: boolean) => void }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleChange = () => {
    setIsChecked((prev) => {
      const newValue = !prev;
      onChange(newValue);
      return newValue;
    });
  };

  return (
    <div
      className={`w-10 h-6 p-1 flex justify-center items-center rounded-full cursor-pointer ${
        isChecked ? "div-gradient" : "bg-gray60"
      } relative`}
      onClick={handleChange}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full transition-all duration-300 absolute ${
          isChecked ? "left-4.5" : "left-0.5"
        }`}
      ></div>
    </div>
  );
};

export default Switch;
