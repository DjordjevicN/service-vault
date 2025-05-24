const TextRow = ({
  label,
  details,
  className = "",
}: {
  label: string;
  details: string | number;
  className?: string;
}) => {
  return (
    <div className={`${className}`}>
      <p className="text-white font-bold">
        {label}: <span className="text-gray55">{details}</span>
      </p>
    </div>
  );
};

export default TextRow;
