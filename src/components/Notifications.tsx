const NotificationsItem = ({ event }: { event: number }) => {
  return (
    <div className="flex items-center justify-between border-b py-2 hover:bg-gray-200">
      <div className="flex items-center">
        <div>
          <h2 className="text-sm font-bold">Event {event}</h2>
          <p className="text-xs">
            Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum
            dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit
            amet.
          </p>
          <p className="text-xs text-gray-500">
            Date: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const events = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className="border w-[300px] p-3 cursor-pointer ">
      <h1 className="text-lg font-bold mb-3">Notifications</h1>
      <div className="h-[300px] overflow-auto">
        {events.map((event) => {
          return <NotificationsItem event={event} key={event} />;
        })}
      </div>
    </div>
  );
};

export default Notifications;
