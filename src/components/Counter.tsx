const Counter = ({
  label,
  count,
}: {
  label: "total" | "pending" | "confirmed";
  count: number;
}) => {
  const getLabel = () => {
    switch (label) {
      case "total":
        return <p className="text-white">Total</p>;
      case "pending":
        return <p className="text-orange-300">Pending</p>;
      case "confirmed":
        return <p className="text-green-500">Confirmed</p>;
      default:
        return "";
    }
  };
  return (
    <div>
      <div>
        {getLabel()}
        <p className="text-white">{count}</p>
      </div>
    </div>
  );
};

export default Counter;
