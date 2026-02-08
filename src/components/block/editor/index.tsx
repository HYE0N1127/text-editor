import { Block, CodeBlock as CodeBlockType } from "../../../type/index";
import BlockInput from "./text/index";
import ImageEditor from "./image/index";
import { CodeEditor } from "./code/index";

type Props = {
  block: Block;
};

const Editor = ({ block }: Props) => {
  if (block.type === "image") {
    return <ImageEditor id={block.id} />;
  }

  if (block.type === "code") {
    return <CodeEditor block={block as CodeBlockType} />;
  }

  return <BlockInput id={block.id} value={block.value} type={block.type} />;
};

export default Editor;
