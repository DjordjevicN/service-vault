import Notifications from "../Notifications";
import UpcomingEvents from "../UpcomingEvents";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1>Dashboard</h1>
      <div className="w-full mt-3 flex gap-4 ">
        <Notifications />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default Dashboard;
