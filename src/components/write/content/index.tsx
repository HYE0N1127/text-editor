import { useEditor, useRootIds } from "../../context/editor/hooks";
import { useDragContext } from "../../drag/block/drop/hooks";
import { DragAndDropProvider, DropZone } from "../../drag/block/drop/index";
import { BlockNode } from "./item/index";

const ContentEditor = () => {
  const rootIds = useRootIds();
  const { moveTo } = useEditor();

  return (
    <DragAndDropProvider>
      <DropZone onDrop={moveTo}>
        <div className="flex flex-col gap-1 pb-[12px]">
          {rootIds.map((id) => (
            <BlockNode key={id} id={id} />
          ))}
        </div>
      </DropZone>
    </DragAndDropProvider>
  );
};

export default ContentEditor;
