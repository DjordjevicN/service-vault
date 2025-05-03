import React from "react";
import MeetHomeCard from "./MeetHomeCard";

const HomeMeets = () => {
  const meets = [
    { id: "1", name: "Meet 1" },
    { id: "2", name: "Meet 2" },
    { id: "3", name: "Meet 3" },
    { id: "4", name: "Meet 4" },
    { id: "5", name: "Meet 5" },
    { id: "6", name: "Meet 6" },
    { id: "7", name: "Meet 7" },
    { id: "8", name: "Meet 8" },
  ];
  return (
    <div>
      <h1>Upcoming events</h1>
      <div>
        {meets.map((meet) => {
          return <MeetHomeCard meet={meet} />;
        })}
      </div>
    </div>
  );
};

export default HomeMeets;
