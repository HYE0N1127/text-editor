import { memo } from "react";
import { Block } from "../../../type/index";
import CodeBlock from "./code/index";
import ImageBlock from "./image/index";
import TextBlock from "./text/index";

interface Props {
  block: Block;
}

const Cell = memo(({ block }: Props) => {
  if (block.type === "code") {
    return <CodeBlock block={block} />;
  }

  if (block.type === "image") {
    return <ImageBlock block={block} />;
  }

  return <TextBlock block={block} />;
});

export default Cell;
