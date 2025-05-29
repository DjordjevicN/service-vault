import React from "react";

type InputProps = {
  value?: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  type?: string;
  placeholder?: string | number;
  wrapperClassName?: string;
  inputClassName?: string;
  description?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  value = "",
  onChange,
  label,
  type = "text",
  placeholder = "placeholder",
  wrapperClassName = "",
  inputClassName = "",
  description,
  errorMessage,
  required = false,
  disabled = false,
}) => {
  return (
    <div
      className={`flex flex-col mt-2 ${wrapperClassName} ${
        disabled && "opacity-50"
      }`}
    >
      {label && (
        <label id={label} className="text-white capitalize font-bold mb-2">
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        className={`border border-gray70 placeholder:text-gray55 text-white h-10 rounded-lg px-4 focus:outline-none bg-mainbg  ${inputClassName}`}
        placeholder={type === "password" ? "********" : String(placeholder)}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {description && <p className="text-sm text-gray55 mt-2">{description}</p>}
      {required && <p className="text-sm text-gray55 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default Input;
