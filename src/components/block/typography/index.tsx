import {
  Block as BlockType,
  CodeBlock as CodeBlockType,
} from "../../../type/index";
import Code from "./code/index";
import Image from "./image";
import { PropsWithChildren, ReactNode } from "react";
import Text from "./text/index";

type Props = {
  block: BlockType;
} & PropsWithChildren;

const Typography = ({ block, children }: Props) => {
  const styles: Record<string, string> = {
    h1: "py-2",
    h2: "py-1.5",
    h3: "py-1",
    quote: "py-1",
    text: "py-1",
    bullet: "py-0.5",
    code: "py-2",
    image: "justify-center py-4",
  };

  const renderContent = (children: ReactNode) => {
    if (block.type === "image") {
      return <Image block={block}>{children}</Image>;
    }

    if (block.type === "code") {
      return <Code block={block as CodeBlockType}>{children}</Code>;
    }

    return <Text block={block}>{children}</Text>;
  };

  return (
    <div
      className={`group relative flex w-full items-start py-1 ${styles[block.type] || ""}`}
    >
      {block.type === "quote" && (
        <div className="mr-3 w-[3px] shrink-0 self-stretch rounded-full bg-gray-300 dark:bg-gray-600" />
      )}

      {block.type === "bullet" && (
        <div className="mr-2 flex h-6 w-5 shrink-0 items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-white" />
        </div>
      )}

      {renderContent(children)}
    </div>
  );
};

export default Typography;
