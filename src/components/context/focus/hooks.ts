import { useContext, useCallback } from "react";
import { FocusBlockContext } from "./contexts";

export const useFocusBlock = () => {
  const ref = useContext(FocusBlockContext);

  if (!ref) {
    throw new Error("useFocusBlock must be used within IsFocusProvider");
  }

  const changeFocus = useCallback(
    (id: string | undefined) => {
      ref.current = id;
    },
    [ref],
  );

  return {
    focusId: ref.current,
    changeFocus,
  };
};
