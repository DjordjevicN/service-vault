import React from "react";
type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  classname?: string;
  variant?: "primary" | "secondary" | "text";
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  classname,
  variant = "primary",
  icon,
  onClick,
}) => {
  const variantClasses = {
    primary: "div-gradient text-white",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    text: "bg-transparent text-blue-600 hover:underline",
  };
  return (
    <button
      onClick={onClick}
      className={`${classname} ${variantClasses[variant]} py-3 px-4 rounded font-semibold flex items-center justify-center gap-2 cursor-pointer`}
      type={type || "button"}
    >
      {icon && icon} {children}
    </button>
  );
};

export default Button;
