const UpcomingEventsItem = ({ event }: { event: number }) => {
  const handleNavigation = () => {
    console.log(event);
  };
  return (
    <div
      className="flex items-center justify-between border-b py-2 cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="flex items-center">
        <div>
          <h2 className="text-sm font-bold">Event {event}</h2>
          <p className="text-xs text-gray-500">
            Date: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <button className="">View</button>
    </div>
  );
};

export default UpcomingEventsItem;
