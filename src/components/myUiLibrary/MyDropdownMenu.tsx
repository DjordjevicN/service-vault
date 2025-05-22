import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ReactNode } from "react";

const MyDropdownMenu = ({
  trigger,
  dropdownLabel,
  options,
}: {
  trigger: string | ReactNode;
  dropdownLabel?: string;
  options: { name: string; action: () => void }[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {typeof trigger === "string" ? (
          <Button variant="outline">{trigger}</Button>
        ) : (
          trigger
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownLabel && (
          <>
            <DropdownMenuLabel>{dropdownLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {options.map((option) => {
          return (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => option.action()}
              key={option.name}
            >
              {option.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyDropdownMenu;
