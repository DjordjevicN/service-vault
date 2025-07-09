import React from "react";
import { Card } from "../ui/card";

type EmptyStateBoxProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  show?: boolean;
};
const EmptyStateBox: React.FC<EmptyStateBoxProps> = ({
  title,
  description,
  children,
  show = true,
}) => {
  if (!show) return null;

  return (
    <Card className="mt-2">
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-muted-foreground mb-2">{description}</p>
        {children}
      </div>
    </Card>
  );
};

export default EmptyStateBox;
