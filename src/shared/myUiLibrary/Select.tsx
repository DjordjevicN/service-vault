import React from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  options: Option[];
  wrapperClassName?: string;
  selectClassName?: string;
};

const Select: React.FC<SelectProps> = ({
  value = "",
  onChange,
  label,
  placeholder = "Select an option",
  options,
  wrapperClassName = "",
  selectClassName = "",
}) => {
  return (
    <div className={`flex flex-col mb-4 ${wrapperClassName}`}>
      {label && (
        <label className="text-white capitalize font-bold mb-2">{label}</label>
      )}
      <select
        className={`border text-sm h-10 rounded-lg px-2 text-muted-foreground focus:outline-none ${selectClassName}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
