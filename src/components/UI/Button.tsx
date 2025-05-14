import React from "react";
type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  wrapperClassName?: string;
  variant?: "primary" | "secondary" | "text";
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  wrapperClassName,
  variant = "primary",
  icon,
  onClick,
  disabled,
}) => {
  const variantClasses = {
    primary: "div-gradient text-white",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    text: "bg-transparent text-gray55 hover:underline",
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${wrapperClassName} ${variantClasses[variant]} ${
        disabled && "opacity-50"
      }  py-3 px-4 rounded font-semibold flex items-center justify-center gap-2 cursor-pointer`}
      type={type || "button"}
    >
      {icon && icon} {children}
    </button>
  );
};

export default Button;
