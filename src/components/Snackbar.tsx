import React, { useContext } from "react";
import { SnackbarContext } from "../contexts/snackbarContext";

// import useStyles from "../../styles/SnackbarComponent";
import { Alert, IconButton, Snackbar } from "@mui/material";

const SnackbarComponent = () => {
  //   const classes = useStyles();

  const [snackbarState, snackbarDispatch] = useContext(SnackbarContext) as any;

  const { message, severity, isSnackbarOpened } = snackbarState;

  const handleClose = () => {
    snackbarDispatch({ type: "CLOSE_SNACKBAR" });
  };

  return (
    <div className={"classes.container"}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={isSnackbarOpened}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarComponent;
