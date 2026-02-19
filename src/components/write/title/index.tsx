import { generateId } from "../../../libs/id/index";
import { useEditor } from "../../context/editor/hooks";
import { useFocusContext } from "../../context/focus/hooks";

const TitleEditor = () => {
  const { changeFocus } = useFocusContext();
  const { enter } = useEditor();

  return (
    <div className="mb-4 pt-12">
      <input
        type="text"
        className="
         w-full
         bg-transparent
         text-[40px]
         font-bold
         text-white             
         placeholder:text-[#555]
         focus:outline-none
        "
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return;

          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const id = generateId();

            changeFocus(id);
            enter({ next: id });
          }
        }}
        placeholder="제목 없음"
      />
    </div>
  );
};

export default TitleEditor;
