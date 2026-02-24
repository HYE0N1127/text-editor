import { createContext, Dispatch, SetStateAction } from "react";

export const FocusStateContext = createContext<string | undefined>(undefined);

export const FocusHandlerContext = createContext<{
  setFocusId: Dispatch<SetStateAction<string | undefined>>;
} | null>(null);
