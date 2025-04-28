import React from "react";

const UserRow = ({ user }: { user: any }) => {
  console.log(user);

  return (
    <div className="flex items-center mb-3 p-2 gap-6">
      <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center">
        A
      </div>
      <div>
        <p className="text-lg font-bold">{user.name}</p>
      </div>
      <div>
        <p>{user.motorcycle}</p>
      </div>
      <div className="ml-auto flex items-center w-[100px]">
        <p className="text-sm text-gray-500 text-left">{user.status}</p>
      </div>
    </div>
  );
};

export default UserRow;
