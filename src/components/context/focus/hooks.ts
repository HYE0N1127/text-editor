import { useContext } from "react";
import { FocusHandlerContext, FocusStateContext } from "./contexts";

export const useFocusState = () => {
  const context = useContext(FocusStateContext);

  if (context == null) {
    throw new Error("useEditor must be used within a FocusProvider");
  }

  return context;
};

export const useFocusHandler = () => {
  const context = useContext(FocusHandlerContext);

  if (context == null) {
    throw new Error("useEditor must be used within a FocusProvider");
  }

  return context;
};
