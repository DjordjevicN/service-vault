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
        placeholder={String(placeholder)}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {description && <p className="text-sm text-gray55 mt-2">{description}</p>}
    </div>
  );
};

export default Input;
