import { createContext, ReactElement, useReducer } from "react";
import snackbarReducer, {
  snackbarInitialState,
} from "../reducers/snackbarReducer";

export const SnackbarContext: any = createContext([null, null]);

const SnackbarProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(snackbarReducer, snackbarInitialState);

  return (
    <SnackbarContext.Provider value={[state, dispatch]}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
