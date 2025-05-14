import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateMeetForm } from "@/store/formsSlice";

import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import { useState } from "react";

const TimeAndDateSection = () => {
  const dispatch = useDispatch();
  const { startTime, startDate } = useSelector(
    (state: RootState) => state.meetForm
  );

  const [selectedDate, setSelectedDate] = useState<Date>(
    startDate ? new Date(startDate) : new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    startTime || "10:00"
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    dispatch(updateMeetForm({ key: "startDate", value: date.toISOString() }));
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    dispatch(updateMeetForm({ key: "startTime", value: time }));
  };

  const combineDateAndTime = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours);
    combined.setMinutes(minutes);
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined;
  };

  const fullDateTime = combineDateAndTime(selectedDate, selectedTime);
  console.log("Full date-time", fullDateTime);

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
      <div>
        <div className="bg-gray80 rounded p-6">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <div className="flex items-center mt-4 bg-gray80 rounded p-6 gap-6">
          <p className="text-gray55">Select the time</p>
          <div>
            <TimePicker
              onChange={handleTimeChange}
              value={selectedTime}
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
