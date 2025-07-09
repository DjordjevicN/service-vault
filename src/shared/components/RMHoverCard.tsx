import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/hover-card";
import { Button } from "../ui/Button";

const RMHoverCard = ({
  children,
  copy,
}: {
  children: ReactNode;
  copy: string;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="link">{children}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p className="border p-2">{copy}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default RMHoverCard;
