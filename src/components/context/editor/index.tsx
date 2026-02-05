import { PropsWithChildren, useMemo } from "react";
import { MarkdownEditor } from "../../../libs/editor/index";
import { MarkdownEditorContext } from "./contexts";

export const MarkdownEditorProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo(() => new MarkdownEditor(), []);

  return (
    <MarkdownEditorContext.Provider value={value}>
      {children}
    </MarkdownEditorContext.Provider>
  );
};
