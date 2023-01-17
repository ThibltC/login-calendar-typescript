import { createContext, ReactElement, useState } from "react";

export const DateContext: any = createContext([null, null]);

const DateProvider = ({ children }: { children: ReactElement }) => {
  const [time, setTime] = useState<string>("");

  return (
    <DateContext.Provider value={[time, setTime]}>
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
