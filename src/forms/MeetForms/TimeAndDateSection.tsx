import { useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const TimeAndDateSection = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [time, setTime] = useState<string>("12:00");

  function combineDateAndTime(date: Date, time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours);
    combined.setMinutes(minutes);
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined;
  }
  const fullDateTime =
    date instanceof Date && time ? combineDateAndTime(date, time) : null;
  console.log("fullDateTime", fullDateTime);

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4">
      <div>
        <h2 className="text-white text-2xl">
          Meet <span className="text-gradient">Time</span> and{" "}
          <span className="text-gradient">Date</span>
        </h2>
        <p className="text-gray55 mt-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ea?
          Accusantium, deleniti dolorum? Officiis fugit dolores at placeat ab
          nesciunt!
        </p>
      </div>
      <div className="">
        <div className="bg-gray80 rounded p-6">
          <Calendar onChange={setDate} value={date} />
        </div>
        <div className="flex items-center mt-4 bg-gray80 rounded p-6 gap-6">
          <p className="text-gray55">Select the time</p>
          <div className="">
            <TimePicker
              onChange={setTime}
              value={time}
              disableClock={true}
              format="HH:mm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAndDateSection;
