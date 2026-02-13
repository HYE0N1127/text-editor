import { useEffect, useRef } from "react";
import { TextBlock } from "../../../../type/tree/index";
import { useEditor, useNode } from "../../../context/editor/hooks";
import { useFocusContext, useIsFocus } from "../../../context/focus/hooks";
import { resizeTextarea } from "../text/helpers";
import { generateId } from "../../../../libs/id/index";

type Props = {
  id: string;
};

const BulletEditor = ({ id }: Props) => {
  const editor = useEditor();
  const node = useNode(id);
  const { changeFocus } = useFocusContext();
  const isFocus = useIsFocus(id);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const parentId = node?.parentId;
  const value = node ? (node.block as TextBlock).value : "";

  useEffect(() => {
    resizeTextarea(textareaRef.current);
  }, [value]);

  useEffect(() => {
    if (isFocus && textareaRef.current) {
      const element = textareaRef.current;
      if (document.activeElement !== element) {
        element.focus();
        const length = element.value.length;
        element.setSelectionRange(length, length);
      }
    }
  }, [isFocus]);

  // 💡 3. Hook 호출이 모두 끝난 이 시점에서 컴포넌트를 종료(Early Return)합니다.
  if (!node) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    editor.updateBlock(id, { value: text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    const isModifier = e.metaKey || e.ctrlKey;

    if (isModifier && e.key === "Enter") {
      e.preventDefault();
      const newChildId = generateId();

      const update: TextBlock = {
        type: "bullet",
        value: "",
      };

      editor.addChild(id, update, newChildId);
      changeFocus(newChildId);
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newId = generateId();

      editor.enter({ next: newId, prev: id, type: "bullet" });
      changeFocus(newId);
      return;
    }

    if (e.key === "Backspace" && value === "") {
      e.preventDefault();

      if (parentId != null) {
        const prevId = editor.getPrevId(id);
        console.log(prevId);

        if (prevId) {
          changeFocus(prevId);
        }

        editor.deleteBlock(id);
        return;
      }

      editor.updateBlock(id, { type: "text" });
      return;
    }
  };

  return (
    <div className="group relative flex w-full items-start py-0.5">
      <div className="mr-2 flex h-6 w-5 shrink-0 items-center justify-center select-none">
        <div className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-white" />
      </div>
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => changeFocus(id)}
        placeholder="리스트 입력..."
        className="block w-full resize-none bg-transparent p-0 text-base leading-6 focus:outline-none placeholder:text-gray-400"
      />
    </div>
  );
};

export default BulletEditor;
