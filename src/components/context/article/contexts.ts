import { createContext } from "react";
import { Article } from "../../../libs/article/index";

export const ArticleContext = createContext<Article | undefined>(undefined);
