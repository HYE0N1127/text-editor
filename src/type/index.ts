export type Article = {
  title: string;
  contents: Content[];
  tag?: string[];
};

export type Content = (TextContent | ImageContent) & {
  id: string;
};

export type TextContent = {
  text: string;
};

export type ImageContent = {
  url: string;
};
