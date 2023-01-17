import React from "react";
import { TailSpin } from "react-loader-spinner";

const classes = {
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
} as any;

const Loader = () => {
  return (
    <div style={classes.root}>
      <TailSpin
        height="80"
        width="80"
        color="blue"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Loader;
