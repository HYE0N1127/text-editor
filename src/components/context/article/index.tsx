import { PropsWithChildren, useMemo } from "react";
import { Article } from "../../../libs/article/index";
import { ArticleContext } from "./contexts";

export const ArticleProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo(() => new Article(), []);

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};
