import { useEditor, useRootIds } from "../../context/editor/hooks";
import { DragAndDropProvider, DropZone } from "../../drag/block/drop/index";
import Block from "./item/index";

const ContentEditor = () => {
  const rootIds = useRootIds();
  const { moveTo } = useEditor();

  return (
    <DragAndDropProvider>
      <DropZone onDrop={moveTo}>
        <div className="flex flex-col gap-1 pb-[12px]">
          {rootIds.map((id) => (
            <Block key={id} id={id} />
          ))}
        </div>
      </DropZone>
    </DragAndDropProvider>
  );
};

export default ContentEditor;
