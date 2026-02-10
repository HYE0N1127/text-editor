import { useEffect, useRef } from "react";
import { Block, Child } from "../../../../type/index";
import { useMarkdownEditor } from "../../../context/editor/hooks";
import { useFocusContext, useIsFocus } from "../../../context/focus/hooks";
import { resizeTextarea } from "../text/helpers";
import { generateId } from "../../../../libs/id/index";

type Props = {
  block: Block;
  parentId?: string;
};

const BulletEditor = ({ block, parentId }: Props) => {
  const { id, value, children } = block;

  const { updateBlock, enter, deleteBlock, getPrevId, addChild } =
    useMarkdownEditor();
  const { changeFocus } = useFocusContext();
  const isFocus = useIsFocus(id);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    updateBlock(id, { ...block, value: text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    const isModifier = e.metaKey || e.ctrlKey;
    console.log(`Key: ${e.key}, Modifier: ${isModifier}`);

    if (isModifier && e.key === "Enter") {
      e.preventDefault();

      const newChildId = generateId();
      const newBlockId = generateId();

      const newBlock: Block = {
        id: newBlockId,
        type: "bullet",
        value: "",
        children: [],
      };

      const child: Child = {
        id: newChildId,
        block: newBlock,
      };

      addChild(id, child);

      changeFocus(newBlockId);
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newId = generateId();
      changeFocus(newId);
      enter({ next: newId, prev: id, type: "bullet" });
    }

    if (e.key === "Backspace" && value === "") {
      e.preventDefault();
      if (parentId != null) {
        const prevId = getPrevId(id);
        if (prevId) changeFocus(prevId);

        deleteBlock(id);
        return;
      }

      updateBlock(id, { type: "text" });
      return;
    }
  };

  return (
    <div className="flex flex-col w-full">
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

      {children && children.length > 0 && (
        <div className="pl-6 w-full">
          {children.map((childBlock) => (
            <BulletEditor
              key={childBlock.id}
              block={childBlock.block}
              parentId={id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BulletEditor;
