import { useEffect, useRef } from "react";
import { MARKDOWN_RULES } from "../../../../constants/rules";
import { generateId } from "../../../../libs/id/index";
import { getTextStyle, resizeTextarea } from "./helpers";
import { Block, BlockType } from "../../../../type/tree/index";
import { useEditor } from "../../../context/editor/hooks";
import { useFocusHandler, useFocusState } from "../../../context/focus/hooks";
import { renderFormattedText } from "../../typography/styler/helper";
import { Styler } from "../../typography/styler/index";

type Props = {
  id: string;
  value: string;
  type: BlockType;
};

/**
 * 텍스트 블록 에디터 컴포넌트입니다.
 * 포커스 상태에 따라 마크다운 문법을 입력할 수 있는 편집 모드(textarea)와
 * 스타일이 적용된 텍스트를 보여주는 뷰어 모드를 전환합니다.
 *
 * @param id 해당 블록의 고유 식별자
 * @param value 블록 내부에 입력된 텍스트 내용
 * @param type 블록의 현재 타입 (예: text, h1, code 등)
 */
const TextEditor = ({ id, value, type }: Props) => {
  const { updateBlock, enter, deleteBlock, getPrevId } = useEditor();
  const { setFocusId } = useFocusHandler();

  const isFocus = useFocusState() === id;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isFocus) {
      resizeTextarea(textareaRef.current);
    }
  }, [value, isFocus]);

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
          } as Block);

          return;
        }

        updateBlock(id, { type: ruleType, value: text.slice(prefix.length) });
        return;
      }
    }
    updateBlock(id, { value: text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const update = generateId();

      setFocusId(update);
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

        if (prevId != null) {
          setFocusId(prevId);
        }

        deleteBlock(id);
      }
    }
  };

  const sharedClasses = `block w-full p-0 break-words whitespace-pre-wrap ${getTextStyle(type)}`;

  return (
    <div
      className="relative w-full min-h-[1.5em]"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!isFocus && target.tagName.toLowerCase() !== "a") {
          setFocusId(id);
        }
      }}
    >
      {isFocus ? (
        // [편집 모드] 직접 textarea를 렌더링
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className={`resize-none bg-transparent text-[#D4D4D4] caret-white focus:outline-none placeholder:text-gray-400 ${sharedClasses}`}
        />
      ) : (
        <Styler value={value} type={type} />
      )}
    </div>
  );
};

export default TextEditor;
