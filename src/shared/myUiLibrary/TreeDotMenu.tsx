import { useRef, useState } from "react";
import treeDotes from "../../assets/tree-dots.svg";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const TreeDotMenu = ({
  options,
}: {
  options: { text: string; action: () => void; isDestructive?: boolean }[];
}) => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  useOutsideClick(dotRef, closeMenu);
  if (options.length === 0) {
    return null;
  }
  return (
    <div ref={dotRef} className="relative">
      <div onClick={toggleMenu} className="relative cursor-pointer">
        <img src={treeDotes} alt="" />
      </div>
      {isOpen && (
        <div className="absolute right-0 top-6 bg-gray80 shadow-lg rounded w-48 p-2 z-10">
          {options.map((option) => {
            return (
              <div
                className="cursor-pointer text-white hover:bg-mainbg p-3 "
                key={option.text}
                onClick={() => option.action()}
              >
                <p className={`${option.isDestructive && "text-red-500"}`}>
                  {option.text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TreeDotMenu;
