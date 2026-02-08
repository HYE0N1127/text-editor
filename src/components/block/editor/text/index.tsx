import { useEffect, useRef } from "react";
import { MARKDOWN_RULES } from "../../../../constants/rules";
import { generateId } from "../../../../libs/id/index";
import { useMarkdownEditor } from "../../../context/editor/hooks";
import { useFocusContext, useIsFocus } from "../../../context/focus/hooks";
import { resizeTextarea } from "./helpers";
import { BlockType } from "../../../../type/index";

type Props = {
  id: string;
  value: string;
  type: BlockType;
};

const BlockInput = ({ id, value, type }: Props) => {
  const { updateBlock, enter, deleteBlock, getPrevId } = useMarkdownEditor();
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

    for (const [prefix, ruleType] of Object.entries(MARKDOWN_RULES)) {
      if (text.startsWith(prefix)) {
        if (ruleType === "code") {
          updateBlock(id, {
            type: "code",
            value: text.slice(prefix.length),
            language: "javascript",
          } as any);
          return;
        }

        updateBlock(id, {
          type: ruleType,
          value: text.slice(prefix.length),
        });
        return;
      }
    }
    updateBlock(id, { value: text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const update = generateId();

      changeFocus(update);
      enter({ next: update, prev: id });
    }

    if (e.key === "Backspace" && value === "") {
      if (type !== "text") {
        e.preventDefault();

        updateBlock(id, { type: "text" });
        return;
      }
      if (type === "text") {
        e.preventDefault();

        const prevId = getPrevId(id);

        if (prevId) {
          changeFocus(prevId);
        }

        deleteBlock(id);
      }
    }
  };

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={() => changeFocus(id)}
      placeholder={
        type.startsWith("h")
          ? `제목 ${type.replace("h", "")}`
          : "내용을 입력하세요..."
      }
      className="block w-full resize-none bg-transparent p-0 focus:outline-none placeholder:text-gray-400"
    />
  );
};

export default BlockInput;
