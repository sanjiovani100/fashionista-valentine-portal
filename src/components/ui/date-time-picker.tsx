import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cx } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>(value);

  // Update parent when our state changes
  React.useEffect(() => {
    onChange(selectedDateTime);
  }, [selectedDateTime, onChange]);

  // Update our state when parent value changes
  React.useEffect(() => {
    setSelectedDateTime(value);
  }, [value]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const newDateTime = new Date(selectedDateTime);
      newDateTime.setFullYear(date.getFullYear());
      newDateTime.setMonth(date.getMonth());
      newDateTime.setDate(date.getDate());
      setSelectedDateTime(newDateTime);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const newDateTime = new Date(selectedDateTime);
      newDateTime.setHours(hours);
      newDateTime.setMinutes(minutes);
      setSelectedDateTime(newDateTime);
    }
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cx(
              "w-[240px] justify-start text-left font-normal",
              "bg-black/20 border-white/10 text-white hover:bg-black/30"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(selectedDateTime, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDateTime}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        value={format(selectedDateTime, "HH:mm")}
        onChange={handleTimeChange}
        className="w-[120px] bg-black/20 border-white/10 text-white"
      />
    </div>
  );
} 


