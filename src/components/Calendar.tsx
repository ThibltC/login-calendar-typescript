import { useState, useEffect, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { Card, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { DateContext } from "../contexts/dateContext";

const Calendar = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [value, setValue] = useState<Dayjs | null>(null);

  const [_, setTime] = useContext(DateContext) as any;

  useEffect(() => {
    setDate(dayjs(new Date()));
    setValue(dayjs(new Date()));
  }, []);

  useEffect(() => {
    setTime(
      dayjs(date).format("DD/MM/YYYY") + " " + dayjs(value).format("HH:mm")
    );
  });

  return (
    <Card
      style={{
        padding: "20px",
        gap: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TextField
          variant="outlined"
          value={dayjs(date).format("DD/MM/YYYY")}
        />
        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
        <TimePicker
          value={value}
          onChange={setValue}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Card>
  );
};

export default Calendar;
