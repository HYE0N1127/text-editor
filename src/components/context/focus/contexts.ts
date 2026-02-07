import { createContext } from "react";
import { Focus } from "../../../libs/focus/index";

export const FocusBlockContext = createContext<Focus | null>(null);
