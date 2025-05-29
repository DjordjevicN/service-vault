import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

type MyDatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

const MyDatePicker = ({ value, onChange }: MyDatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default MyDatePicker;
