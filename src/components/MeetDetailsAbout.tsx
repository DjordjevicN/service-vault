import { Card, CardContent, CardTitle } from "./ui/card";

const MeetDetailsAbout = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Card className="mt-4">
      <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      <CardContent className="text-sm">{description}</CardContent>
    </Card>
  );
};

export default MeetDetailsAbout;
