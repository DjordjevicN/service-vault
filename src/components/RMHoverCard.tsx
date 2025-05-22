import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";

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
