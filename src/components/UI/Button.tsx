import React from "react";
type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  classname?: string;
  variant?: "primary" | "secondary" | "text";
  icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  classname,
  variant = "primary",
  icon,
}) => {
  const variantClasses = {
    primary: "div-gradient text-white",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    text: "bg-transparent text-blue-600 hover:underline",
  };
  return (
    <button
      className={`${classname} ${variantClasses[variant]} py-3 px-4 rounded font-semibold flex items-center gap-2`}
      type={type || "button"}
    >
      {icon && icon} {children}
    </button>
  );
};

export default Button;
