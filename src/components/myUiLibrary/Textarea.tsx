import React from "react";

type TextareaProps = {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  wrapperClassName?: string;
  textareaClassName?: string;
  rows?: number;
};

const Textarea: React.FC<TextareaProps> = ({
  value = "",
  onChange,
  label,
  placeholder = "",
  wrapperClassName = "",
  textareaClassName = "",
  rows = 4,
}) => {
  return (
    <div className={`flex flex-col mt-2 ${wrapperClassName}`}>
      {label && (
        <label className="text-white capitalize font-bold mb-2">{label}</label>
      )}
      <textarea
        className={`border border-gray70 placeholder:text-gray55 text-white rounded-lg px-4 py-2 focus:outline-none bg-mainbg resize-none ${textareaClassName}`}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Textarea;
