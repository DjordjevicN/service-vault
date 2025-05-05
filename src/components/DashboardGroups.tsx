import DashboardGroupItem from "./DashboardGroupItem";

const DashboardGroups = () => {
  const groups = [
    { id: "1", name: "Kawasaki Belgrade" },
    { id: "2", name: "Arhangeli" },
    { id: "3", name: "Crusers" },
    { id: "4", name: "Srbi" },
    { id: "5", name: "BRD Riders" },
  ];
  return (
    <div className="mt-6 bg-gray80 rounded p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-white">Your groups</h2>
        <p className="text-gray55 cursor-pointer">See all your groups</p>
      </div>
      <div className="mt-4">
        {groups.map((group) => {
          return <DashboardGroupItem key={group.id} group={group} />;
        })}
      </div>
    </div>
  );
};

export default DashboardGroups;
