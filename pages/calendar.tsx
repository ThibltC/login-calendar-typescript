import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

const Calendar = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TextField
        id="outlined-basic"
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
  );
};

export default Calendar;
