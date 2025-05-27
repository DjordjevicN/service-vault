import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateMeetForm } from "@/store/meetFormSlice";
import TimePicker from "react-time-picker";
import { useState } from "react";
import MyDatePicker from "@/components/myUiLibrary/MyDatePicker";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { combineDateAndTime, getDate } from "@/components/utils/getDates";

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

    dispatch(updateMeetForm({ key: "startDate", value: getDate(date) }));
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    dispatch(updateMeetForm({ key: "startTime", value: time }));
  };

  const fullDateTime = combineDateAndTime(selectedDate);
  console.log("Full date-time", fullDateTime);

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
      <Card className="px-6">
        <div>
          <h2 className="">
            Meet <span className="text-gradient">Time</span> and{" "}
            <span className="text-gradient">Date</span>
          </h2>
          <p className="text-gray55 mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ea?
            Accusantium, deleniti dolorum? Officiis fugit dolores at placeat ab
            nesciunt!
          </p>
        </div>
      </Card>
      <Card className="px-6">
        <div>
          <Label className="text-gray55" htmlFor="date">
            Pick a date
          </Label>
          <MyDatePicker onChange={(date) => handleDateChange(date)} />

          <div>
            <Label className="mt-4 text-gray55" htmlFor="time">
              Select the time
            </Label>
            <TimePicker
              onChange={handleTimeChange}
              value={selectedTime}
              disableClock={true}
              format="HH:mm"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TimeAndDateSection;
