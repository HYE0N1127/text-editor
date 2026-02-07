import { useMarkdownContents } from "../../context/editor/hooks";
import Cell from "../item/index";

const ContentEditor = () => {
  const contents = useMarkdownContents();

  return (
    <div className="flex flex-col gap-1 pb-[12px]">
      {contents.map((block) => (
        <Cell key={block.id} block={block} />
      ))}
    </div>
  );
};

export default ContentEditor;
