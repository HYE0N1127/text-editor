import { PropsWithChildren } from "react";
import { Block as BlockType } from "../../../../type/index";

type Props = {
  block: BlockType;
} & PropsWithChildren;

const Text = ({ block, children }: Props) => {
  const styles: Record<string, string> = {
    h1: "text-4xl font-bold text-white mb-4",
    h2: "text-2xl font-semibold text-white mb-2",
    h3: "text-xl font-medium text-white mb-1",
    quote: "text-base text-white italic",
    text: "text-base text-white leading-relaxed",
    bullet: "text-base text-white leading-relaxed",
  };

  const className = styles[block.type] || styles.text;

  if (children) {
    return <div className={className}>{children}</div>;
  }

  switch (block.type) {
    case "h1":
      return <p className={className}>{block.value}</p>;
    case "h2":
      return <p className={className}>{block.value}</p>;
    case "h3":
      return <p className={className}>{block.value}</p>;
    case "quote":
      return <p className={className}>{block.value}</p>;
    default:
      return <p className={className}>{block.value}</p>;
  }
};

export default Text;
