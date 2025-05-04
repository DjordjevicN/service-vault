import React from "react";

const Avatar = ({
  url = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  size = 48,
}: {
  url?: string;
  size?: number;
}) => {
  return (
    <div className="box-gradient">
      <img
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "cover",
        }}
        className="rounded-full"
        src={url}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
