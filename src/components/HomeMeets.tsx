import React from "react";
import MeetHomeCard from "./MeetHomeCard";
import { meets } from "@/data/meetData";

const HomeMeets = () => {
  return (
    <div className="px-6">
      <h1 className="text-2xl text-white mb-6">Upcoming events</h1>
      <div className="flex flex-wrap gap-4 gap-y-10 w-full justify-between">
        {meets.map((meet) => {
          return <MeetHomeCard key={meet.id} meetDetails={meet} />;
        })}
      </div>
    </div>
  );
};

export default HomeMeets;
