import React from "react";

const Navigation = () => {
  return (
    <div className="w-[200px] p-5 border-r h-[100vh]">
      <h1>Navigation</h1>
      <div className="mt-10 flex flex-col gap-5">
        <p>Home</p>
        <p>Dashboard</p>
        <p>Profile</p>
      </div>
    </div>
  );
};

export default Navigation;
