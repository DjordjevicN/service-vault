const MeetEmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default MeetEmptyState;
