import { MEET_TYPES } from "@/constants/meetTypes";
import React from "react";

const MeetHomeCard: React.FC<MEET_TYPES> = ({ meet }) => {
  return <div>{meet.name}</div>;
};

export default MeetHomeCard;
