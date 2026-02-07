import { PropsWithChildren, useRef } from "react";
import { FocusBlockContext } from "./contexts";

export const IsFocusProvider = ({ children }: PropsWithChildren) => {
  const focusRef = useRef<string | undefined>(undefined);

  return (
    <FocusBlockContext.Provider value={focusRef}>
      {children}
    </FocusBlockContext.Provider>
  );
};
