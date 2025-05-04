import React from "react";

const MeetDetailsAbout = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="">
      <p className="text-xl mb-2 font-bold text-white">{title}</p>
      <p className="text-gray50">{description}</p>
    </div>
  );
};

export default MeetDetailsAbout;
