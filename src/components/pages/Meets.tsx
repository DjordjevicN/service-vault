import React from "react";

const MeetCard = ({ meet }) => {
  console.log(meet);

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
  const meets = [
    {
      id: 1,
      name: "Belgrade Kawasaki Z Meetup",
      date: "2023-10-01",
      location: "Belgrade, Serbia",
      description:
        "Join us for a ride through the beautiful streets of Belgrade.",
      participants: [
        {
          id: 1,
          name: "Nikola",
          status: "confirmed",
          motorcycle: "KawasakiZ 1000",
        },
        {
          id: 2,
          name: "Marko",
          status: "pending",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 3,
          name: "Jovan",
          status: "confirmed",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 4,
          name: "Stefan",
          status: "pending",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 5,
          name: "Milan",
          status: "confirmed",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 6,
          name: "Aleksandar",
          status: "pending",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 7,
          name: "Vladimir",
          status: "confirmed",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 8,
          name: "Nemanja",
          status: "pending",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 9,
          name: "Luka",
          status: "confirmed",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 10,
          name: "Andrija",
          status: "pending",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 11,
          name: "Petar",
          status: "confirmed",
          motorcycle: "Kawasaki Z 1000",
        },
        {
          id: 12,
          name: "Miloš",
          status: "pending",
          motorcycle: "Kawasaki Z 1000",
        },
      ],
    },
  ];
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
