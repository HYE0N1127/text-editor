export type Article = {
  title: string;
  contents: Content[];
  tag: string[];
};

export type Content = {
  id: string;
  content: string;
};
