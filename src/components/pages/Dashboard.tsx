import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DashboardGroups from "../DashboardGroups";
import DashboardListing from "../DashboardListing";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const Dashboard = () => {
  const [value, onChange] = useState<Value>(new Date());
  console.log("value", value);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white mt-14 mb-10">
        Welcome, Nikola
      </h1>
      <p className="text-white text-xl mb-10">Events from your groups</p>
      <div className="">
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <div className="">
            <div>
              <div className="bg-gray80 rounded p-6">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
            <DashboardGroups />
          </div>
          <DashboardListing />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
