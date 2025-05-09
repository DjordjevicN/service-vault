import React from "react";

type InputProps = {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  type?: string;
  placeholder?: string;
  wrapperClassName?: string;
  inputClassName?: string;
};

const Input: React.FC<InputProps> = ({
  value = "",
  onChange,
  label,
  type = "text",
  placeholder = "",
  wrapperClassName = "",
  inputClassName = "",
}) => {
  return (
    <div className={`flex flex-col mt-4 ${wrapperClassName}`}>
      {label && (
        <label id={label} className="text-white capitalize font-bold mb-2">
          {label}
        </label>
      )}
      <input
        className={`border border-gray70 placeholder:text-gray55 text-white h-10 rounded-lg px-4 focus:outline-none bg-mainbg  ${inputClassName}`}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Input;
