import { createContext } from "react";
import { MarkdownEditor } from "../../../libs/editor/index";

export const MarkdownEditorContext = createContext<MarkdownEditor | undefined>(
  undefined,
);
