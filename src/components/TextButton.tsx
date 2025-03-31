import { ReactNode } from "react";

const TextButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button onClick={() => onClick()} className="text-blue-600 cursor-pointer">
      {children}
    </button>
  );
};

export default TextButton;
