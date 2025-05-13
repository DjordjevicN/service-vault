import Avatar from "@/components/Avatar";
import Input from "@/components/UI/Input";
import { useState } from "react";

const ParticipantsSection = () => {
  const [userSearch, setUserSearch] = useState("");

  // const foundUsers = [
  //   "John Doe",
  //   "Jane Smith",
  //   "Alice Johnson",
  //   "Bob Brown",
  //   "Charlie Davis",
  // ].filter((user) => user.toLowerCase().includes(userSearch.toLowerCase()));
  const foundUsers = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Davis",
  ];
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4">
      <div>
        <h2 className="text-gradient text-2xl w-fit">Add Riders</h2>
        <p className="text-gray55 mt-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ea?
          Accusantium, deleniti dolorum? Officiis fugit dolores at placeat ab
          nesciunt!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Search for a riders"
          onChange={(value) => setUserSearch(value as string)}
          value={userSearch}
          label="Search"
        />
        <div className="relative">
          <div className="absolute flex flex-col gap-2 w-full">
            {foundUsers.map((user) => (
              <div
                key={user}
                className="p-4 rounded-lg flex items-center border border-gray70"
              >
                <Avatar />
                <p className="ml-4 text-white">{user}</p>
                <p className="ml-4 text-white">Motorcycle</p>
                <button className="text-gradient w-fit px-4 py-2 rounded-lg ml-auto">
                  Send Invite
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsSection;
