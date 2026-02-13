import { createContext } from "react";
import { MarkdownEditor } from "../../../libs/tree/index";

export const MarkdownEditorContext = createContext<MarkdownEditor | undefined>(
  undefined,
);
