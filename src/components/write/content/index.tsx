import Block from "../../block/index";
import BlockInput from "../../block/input/index";
import Text from "../../block/typography/index";
import { useMarkdownContents } from "../../context/editor/hooks";

const ContentEditor = () => {
  const contents = useMarkdownContents();

  return (
    <div className="flex flex-col gap-1 pb-[12px]">
      {contents.map((block) => (
        <Block key={block.id} id={block.id}>
          <Text type={block.type}>
            <BlockInput id={block.id} value={block.value} type={block.type} />
          </Text>
        </Block>
      ))}
    </div>
  );
};

export default ContentEditor;
