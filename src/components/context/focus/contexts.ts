import { createContext, RefObject } from "react";

export const FocusBlockContext = createContext<RefObject<string | null> | null>(
  null,
);
