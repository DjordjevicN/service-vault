import { MeetType } from "@/constants/meetTypes";
import { X } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";
import DashboardListing from "./DashboardListing";

const TodaysEventsModal = ({
  events,
  setTodaysEvents,
}: {
  events: MeetType[];
  setTodaysEvents: React.Dispatch<React.SetStateAction<MeetType[]>>;
}) => {
  console.log("todaysEvents", events);

  return (
    <Card
      className={`fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm ${
        events.length === 0 ? "hidden" : ""
      }`}
    >
      <div className="">
        <div className="flex justify-end cursor-pointer">
          <X onClick={() => setTodaysEvents([])} />
        </div>
        <div className="flex p-6 max-h-[90vh] overflow-auto">
          <DashboardListing meets={events} />
        </div>
      </div>
    </Card>
  );
};

export default TodaysEventsModal;
