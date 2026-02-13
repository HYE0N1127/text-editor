import BulletEditor from "../../../block/editor/bullet/index";
import { CodeEditor } from "../../../block/editor/code/index";
import ImageEditor from "../../../block/editor/image/index";
import TextEditor from "../../../block/editor/text/index";
import Bullet from "../../../block/typography/bullet/index";
import Code from "../../../block/typography/code/index";
import Image from "../../../block/typography/image/index";
import Typography from "../../../block/typography/index";
import Quote from "../../../block/typography/quote/index";
import { useNode } from "../../../context/editor/hooks";

export const BlockNode = ({ id }: { id: string }) => {
  const node = useNode(id);

  if (!node) return null;

  const { block, childrenIds } = node;

  const renderBlockContent = () => {
    switch (block.type) {
      case "image": {
        return (
          <Image id={id} block={block}>
            <ImageEditor id={id} />
          </Image>
        );
      }
      case "code": {
        return (
          <Code block={block}>
            <CodeEditor id={id} block={block} />
          </Code>
        );
      }
      case "quote": {
        return (
          <Quote block={block}>
            <TextEditor id={id} value={block.value} type={block.type} />
          </Quote>
        );
      }
      case "bullet": {
        return (
          <Bullet block={block}>
            <BulletEditor id={id} />
          </Bullet>
        );
      }
      default: {
        return (
          <Typography block={block}>
            <TextEditor id={id} value={block.value} type={block.type} />
          </Typography>
        );
      }
    }
  };

  return (
    <div>
      {renderBlockContent()}

      {childrenIds.length > 0 && (
        <div className="ml-3 flex flex-col gap-1 mt-1">
          {childrenIds.map((childId) => (
            <BlockNode key={childId} id={childId} />
          ))}
        </div>
      )}
    </div>
  );
};
