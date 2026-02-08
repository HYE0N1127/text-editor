import { memo } from "react";
import { Block } from "../../../type/index";
import CodeBlock from "./code/index";
import TextBlock from "./text/index";
import { useIsFocus } from "../../context/focus/hooks";
import ImageBlock from "./image/index";

interface Props {
  block: Block;
}

const Cell = memo(
  ({ block }: Props) => {
    const isFocus = useIsFocus(block.id);

    if (block.type === "code") {
      return <CodeBlock block={block} />;
    }

    if (block.type === "image") {
      return <ImageBlock block={block} />;
    }

    return <TextBlock block={block} isFocus={isFocus} />;
  },
  (prev: Props, next: Props) =>
    prev.block.id === next.block.id &&
    prev.block.type === next.block.type &&
    prev.block.value === next.block.value,
);

export default Cell;
