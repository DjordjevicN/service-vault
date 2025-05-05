import React from "react";

type InputProps = {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  type?: string;
  placeholder?: string;
  WrapperClassName?: string;
  InputClassName?: string;
};

const Input: React.FC<InputProps> = ({
  value = "",
  onChange,
  label,
  type = "text",
  placeholder = "",
  WrapperClassName = "",
  InputClassName = "",
}) => {
  return (
    <div className={`flex flex-col ${WrapperClassName}`}>
      {label && (
        <label id={label} className="text-gray70 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        className={`border border-gray55 placeholder:text-gray55 text-white h-10 rounded-lg px-4 focus:outline-none  ${InputClassName}`}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Input;
