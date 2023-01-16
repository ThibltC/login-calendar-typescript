export const snackbarInitialState = {
  message: "",
  isSnackbarOpened: false,
  severity: "",
};

type State = {
  message: string;
  isSnackbarOpened: boolean;
};

type Action = {
  type: string;
  message: string;
  severity: "error" | "warning" | "info" | "success";
};

const snackbarReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CLOSE_SNACKBAR": {
      return { ...state, isSnackbarOpened: false };
    }
    case "ACTIVE_SNACKBAR": {
      const { message, severity } = action;
      return { ...state, message, severity, isSnackbarOpened: true };
    }
    default:
      return state;
  }
};

export default snackbarReducer;
