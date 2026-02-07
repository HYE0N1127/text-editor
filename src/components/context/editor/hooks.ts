import { useContext, useSyncExternalStore } from "react";
import { MarkdownEditorContext } from "./contexts";

export const useMarkdownEditor = () => {
  const article = useContext(MarkdownEditorContext);

  if (article == null) {
    throw new Error("useMarkdownEditor must used in MarkdownEditorProvider");
  }

  return article;
};

export const useMarkdownContents = () => {
  const context = useMarkdownEditor();

  return useSyncExternalStore(context.subscribe, () => context.blocks);
};
