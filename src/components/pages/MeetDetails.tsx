import UserRow from "./UserRow";

const MeetDetails = () => {
  const user = [
    {
      id: 1,
      name: "Nikola",
      status: "confirmed",
      motorcycle: "Kawasaki Z 1000",
    },
    { id: 2, name: "Marko", status: "pending", motorcycle: "Kawasaki Z 1000" },
    {
      id: 3,
      name: "Jovan",
      status: "confirmed",
      motorcycle: "Kawasaki Z 1000",
    },
    { id: 4, name: "Stefan", status: "pending", motorcycle: "Kawasaki Z 1000" },
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
    { id: 9, name: "Luka", status: "confirmed", motorcycle: "Kawasaki Z 1000" },
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
    { id: 12, name: "Miloš", status: "pending", motorcycle: "Kawasaki Z 1000" },
  ];
  return (
    <div className="p-6 ">
      <h1 className="text-4xl mb-4">Belgrade Kawasaki Z Meetup</h1>
      <p>Belgrade, Serbia</p>
      <p>Organized by Nikola</p>
      <p>Status: Ongoing</p>
      <div className="mt-4">
        <p className="text-xl mb-2 font-bold">About</p>
        <p>
          Lorem ipsum dolor sit amet consectetur. Sociis habitant consectetur
          libero pellentesque sagittis erat. Consectetur sed aliquet senectus
          eget vestibulum vitae amet mauris. Scelerisque semper eu molestie in
          arcu. Lectus ut aliquam nunc pellentesque ipsum commodo in dictumst.
          Dictum massa arcu consectetur nulla. Dolor in venenatis dolor etiam
          rhoncus dictum quisque consequat venenatis. Iaculis metus aliquet
          magnis erat. Id in odio blandit lectus. Placerat tincidunt tincidunt
          sit lacus sed nullam. Cras duis purus donec est eleifend arcu.
          Pellentesque magna felis turpis nec morbi fermentum donec ac. Amet
          adipiscing faucibus nunc metus ultrices vel. Amet et vulputate lacus
          nullam facilisis tortor. Vitae at nisl nulla orci sit odio ipsum
          pulvinar.
        </p>
      </div>
      <div className="flex gap-9 mt-10">
        <div>
          <p>Total</p>
          <p>30</p>
        </div>
        <div>
          <p>Pending</p>
          <p>20</p>
        </div>
        <div>
          <p>Confirmed</p>
          <p>10</p>
        </div>
      </div>
      <div className="h-96 overflow-auto mt-3">
        {user.map((user) => (
          <UserRow user={user} />
        ))}
      </div>
    </div>
  );
};

export default MeetDetails;
