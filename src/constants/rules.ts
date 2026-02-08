import { BlockType } from "../type/index";

export const MARKDOWN_RULES: Record<string, BlockType> = {
  "# ": "h1",
  "## ": "h2",
  "### ": "h3",
  "```": "code",
  "| ": "quote",
  "- ": "bullet",
};
