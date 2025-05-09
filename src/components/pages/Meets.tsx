import React from "react";
import { useSelector } from "react-redux";

const MeetCard = ({ meet }) => {
  return (
    <div>
      <h2 className="text-2xl">{meet.name}</h2>
      <p>{meet.date}</p>
      <p>{meet.location}</p>
      <p>{meet.description}</p>
      <div>{`Participants: ${meet.participants.length}`}</div>
    </div>
  );
};

const Meets = () => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="p-6">
      <h1 className="text-4xl mb-4">Meets</h1>
      <input
        className="border border-gray-300 rounded"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div>
        {meets.map((meet) => {
          return <MeetCard key={meet.id} meet={meet} />;
        })}
      </div>
    </div>
  );
};

export default Meets;
