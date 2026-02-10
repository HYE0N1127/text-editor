import { Block as BlockType } from "../../../type/index";
import BulletEditor from "../../block/editor/bullet/index";
import { CodeEditor } from "../../block/editor/code/index";
import ImageEditor from "../../block/editor/image/index";
import TextEditor from "../../block/editor/text/index";
import Block from "../../block/index";
import Bullet from "../../block/typography/bullet/index";
import Code from "../../block/typography/code/index";
import Image from "../../block/typography/image/index";
import Typography from "../../block/typography/index";
import Quote from "../../block/typography/quote/index";
import { useMarkdownContents } from "../../context/editor/hooks";

const ContentEditor = () => {
  const contents = useMarkdownContents();

  const renderBlockContent = (block: BlockType) => {
    switch (block.type) {
      case "image": {
        return (
          <Image block={block}>
            <ImageEditor id={block.id} />
          </Image>
        );
      }

      case "code": {
        return (
          <Code block={block}>
            <CodeEditor block={block} />
          </Code>
        );
      }

      case "quote": {
        return (
          <Quote block={block}>
            <TextEditor id={block.id} value={block.value} type={block.type} />
          </Quote>
        );
      }

      case "bullet": {
        return (
          <Bullet block={block}>
            <BulletEditor block={block} />
          </Bullet>
        );
      }

      default: {
        return (
          <Typography block={block}>
            <TextEditor id={block.id} value={block.value} type={block.type} />
          </Typography>
        );
      }
    }
  };

  return (
    <div className="flex flex-col gap-1 pb-[12px]">
      {contents.map((block) => (
        <Block key={block.id}>{renderBlockContent(block)}</Block>
      ))}
    </div>
  );
};

export default ContentEditor;
