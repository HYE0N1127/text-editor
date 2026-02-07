import { createContext, RefObject } from "react";

export const FocusBlockContext = createContext<
  RefObject<string | undefined> | undefined
>(undefined);
