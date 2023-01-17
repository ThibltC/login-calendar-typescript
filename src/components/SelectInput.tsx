import { FormControl, InputLabel, Select } from "@mui/material";
import React, { ReactElement } from "react";

type SelectInputProps = {
  value: string;
  label: string;
  onChange: (value: string) => void;
  children: ReactElement[];
};

const SelectInput = (props: SelectInputProps): ReactElement => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        label={props.label}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.children}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
