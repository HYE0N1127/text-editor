import { useContext, useSyncExternalStore } from "react";
import { ArticleContext } from "./contexts";

export const useArticle = () => {
  const article = useContext(ArticleContext);

  if (article == null) {
    throw new Error("useArticle must used in ArticleProvider");
  }

  return article;
};

export const useArticleTitle = () => {
  const context = useArticle();

  return useSyncExternalStore(context.subscribeTitle, () => context.title);
};

export const useArticleContents = () => {
  const context = useArticle();

  return useSyncExternalStore(
    context.subscribeContents,
    () => context.contents,
  );
};
