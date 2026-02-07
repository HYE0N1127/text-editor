import { useContext, useSyncExternalStore } from "react";
import { FocusBlockContext } from "./contexts";

export const useFocusContext = () => {
  const context = useContext(FocusBlockContext);

  if (context == null) {
    throw new Error("useFocusContext must used in FocusProvider");
  }

  return context;
};

export const useIsFocus = (id?: string) => {
  const context = useFocusContext();

  const currentFocus = useSyncExternalStore(
    context.subscribe,
    () => context.focusId,
  );

  return currentFocus === id;
};
