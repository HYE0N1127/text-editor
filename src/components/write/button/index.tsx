import { generateId } from "../../../libs/id/index";
import { useEditor } from "../../context/editor/hooks";
import { useFocusContext } from "../../context/focus/hooks";

const EditorBlockCreator = () => {
  const { enter, getLastId } = useEditor();
  const { changeFocus } = useFocusContext();

  const handleEnter = () => {
    const id = generateId();
    const prev = getLastId();

    changeFocus(id);
    enter({ next: id, prev: prev });
  };

  return <button className="bg-transparent w-full h-8" onClick={handleEnter} />;
};

export default EditorBlockCreator;
