import { Card, CardContent, CardTitle } from "./ui/card";

const MeetDetailsAbout = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Card className="mt-2">
      <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      <CardContent className="text-sm whitespace-pre-line">
        {description}
      </CardContent>
    </Card>
  );
};

export default MeetDetailsAbout;
