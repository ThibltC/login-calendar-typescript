import { ReactElement, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

type PasswordInputProps = {
  onChange: (value: string) => void;
};

const PasswordInput = (props: PasswordInputProps): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl sx={{ width: "25ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
        Mot de passe
      </InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={(e) => props.onChange(e.target.value)}
        label="Mot de passe"
      />
    </FormControl>
  );
};

export default PasswordInput;
