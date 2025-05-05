import React from "react";
import { meets } from "@/data/meetData";
import GroupListingItem from "./GroupListingItem";
import Switch from "./UI/Switch";

const DashboardListing = () => {
  return (
    <div>
      <div className="h-9 mb-4 flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-3">
          <p className="text-gray55">Favorite</p>
          <Switch />
        </div>
      </div>

      <div>
        {meets.map((meet) => {
          return <GroupListingItem key={meet.id} meet={meet} />;
        })}
      </div>
    </div>
  );
};

export default DashboardListing;
