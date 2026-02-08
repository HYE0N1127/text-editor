import Editor from "../../block/editor/index";
import Block from "../../block/index";
import Typography from "../../block/typography/index";
import { useMarkdownContents } from "../../context/editor/hooks";

const ContentEditor = () => {
  const contents = useMarkdownContents();

  return (
    <div className="flex flex-col gap-1 pb-[12px]">
      {contents.map((block) => (
        <Block key={block.id}>
          <Typography block={block}>
            <Editor block={block} />
          </Typography>
        </Block>
      ))}
    </div>
  );
};

export default ContentEditor;
