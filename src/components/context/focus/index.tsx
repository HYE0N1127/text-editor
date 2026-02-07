import { PropsWithChildren, useMemo } from "react";
import { FocusBlockContext } from "./contexts";
import { Focus } from "../../../libs/focus/index";

export const IsFocusProvider = ({ children }: PropsWithChildren) => {
  const focus = useMemo(() => new Focus(), []);

  return (
    <FocusBlockContext.Provider value={focus}>
      {children}
    </FocusBlockContext.Provider>
  );
};
