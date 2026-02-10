import { Block as BlockType } from "../../../type/index";
import { memo, PropsWithChildren } from "react";
import Text from "./text/index";

type Props = {
  block: BlockType;
} & PropsWithChildren;

const Typography = memo(
  ({ block, children }: Props) => {
    const validTypes = ["h1", "h2", "h3", "text"];

    if (!validTypes.includes(block.type)) {
      throw new Error(
        `Typography component only supports [h1, h2, h3, text]. Received: ${block.type}`,
      );
    }

    const styles: Record<string, string> = {
      h1: "py-2",
      h2: "py-1.5",
      h3: "py-1",
      text: "py-1",
    };

    return (
      <div
        className={`group relative flex w-full items-start py-1 ${styles[block.type] || ""}`}
      >
        <Text block={block}>{children}</Text>
      </div>
    );
  },
  (prev: Props, next: Props) =>
    prev.block.id === next.block.id &&
    prev.block.value === next.block.value &&
    prev.block.type === next.block.type,
);

export default Typography;
