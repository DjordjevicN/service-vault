import React from "react";
import UpcomingEventsItem from "./UpcomingEventsItem";

const UpcomingEvents = () => {
  const events = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className="border w-[300px] p-3">
      <h1 className="text-lg font-bold mb-3">Upcoming Events</h1>
      <div className="h-[300px] overflow-auto">
        {events.map((event) => {
          return <UpcomingEventsItem event={event} key={event} />;
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
