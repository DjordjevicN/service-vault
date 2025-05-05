import React from "react";
import placeholder from "../assets/placeholder.png";

const DashboardGroupItem = ({ group }) => {
  console.log("group", group);
  const handleRedirect = (id: string) => {
    console.log("Redirecting to group with id:", id);
  };
  return (
    <div
      className="flex items-center gap-4 bg-mainbg p-4 rounded mb-4 cursor-pointer"
      onClick={() => handleRedirect(group.id)}
    >
      <img src={placeholder} alt="group banner" className="w-[100px]" />
      <h2 className="text-white">{group.name}</h2>
    </div>
  );
};

export default DashboardGroupItem;
