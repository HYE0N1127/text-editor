import { useRootIds } from "../../context/editor/hooks";
import { BlockNode } from "./item/index";

const ContentEditor = () => {
  const rootIds = useRootIds();

  return (
    <div className="flex flex-col gap-1 pb-[12px]">
      {rootIds.map((id) => (
        <BlockNode key={id} id={id} />
      ))}
    </div>
  );
};

export default ContentEditor;
