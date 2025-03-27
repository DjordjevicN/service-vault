const InformationField = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => {
  return (
    <div className="flex gap-3">
      <p className="font-bold">{label}</p>
      <p>{value}</p>
    </div>
  );
};
export default InformationField;
