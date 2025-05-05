import React from "react";
import placeholder from "../assets/placeholder.png";
import Avatar from "./Avatar";
const OrgMember = ({ user }) => {
  return (
    <div className="w-[200px] h-[200px] bg-mainbg p-3 rounded flex flex-col items-center justify-center text-white">
      <Avatar size={80} url={placeholder} />
      <p className="mt-4 font-bold">{user.name}</p>
      <p className="text-sm text-gray55">{user.rank}</p>
    </div>
  );
};

export default OrgMember;
