export type Article = {
  title: string;
  contents: Block[];
  tag?: string[];
};

export type BlockType =
  | "text"
  | "image"
  | "h1"
  | "h2"
  | "h3"
  | "code"
  | "quote"
  | "bullet";

type Base = {
  id: string;
};

export type TextBlock = Base & {
  type: "text" | "h1" | "h2" | "h3" | "bullet" | "quote";
  value: string;
};

export type ImageBlock = Base & {
  type: "image";
  value: string;
  isLoading?: boolean;
  width?: number;
  height?: number;
};

export type CodeBlock = Base & {
  type: "code";
  value: string;
  language: string;
};

export type Block = (TextBlock | ImageBlock | CodeBlock) & {
  children?: Block[];
};
