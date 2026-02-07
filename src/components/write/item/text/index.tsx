import { useEffect, useRef } from "react";
import { Block, BlockType } from "../../../../type/index";
import { useMarkdownEditor } from "../../../context/editor/hooks";
import { generateId } from "../../../../libs/id/index";
import { useFocusBlock } from "../../../context/focus/hooks";
import { getTextStyle, resizeTextarea } from "../helpers";

type Props = {
  block: Block;
};

const MARKDOWN_RULES: Record<string, BlockType> = {
  "# ": "h1",
  "## ": "h2",
  "### ": "h3",
  "```": "code",
};

const TextBlock = ({ block }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { deleteBlock, updateBlock, enter, getPrevId } = useMarkdownEditor();
  const { focusId, changeFocus } = useFocusBlock();
  const isFocus = focusId === block.id;

  // textarea는 자동으로 높이 변경이 일어나지 않기에, 값이 변경되는 시점마다 높이를 계산합니다.
  useEffect(() => {
    resizeTextarea(textareaRef.current);
  }, [block.value]);

  // 포커싱 대상이 된다면 DOM에 포커스를 줍니다.
  useEffect(() => {
    if (isFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFocus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    for (const [prefix, type] of Object.entries(MARKDOWN_RULES)) {
      if (text.startsWith(prefix)) {
        if (type === "code") {
          updateBlock(block.id, {
            type: "code",
            value: text.slice(prefix.length),
            language: "javascript",
          } as any);
          return;
        }

        updateBlock(block.id, {
          type: type,
          value: text.slice(prefix.length),
        });

        return;
      }
    }
    updateBlock(block.id, { value: text });
  };

  return (
    <div className="group relative flex w-full items-start py-1">
      <textarea
        ref={textareaRef}
        rows={1}
        value={block.value}
        placeholder={
          block.type.startsWith("h")
            ? `제목 ${block.type.replace("h", "")}`
            : "내용을 입력하세요..."
        }
        className={`
          w-full resize-none bg-transparent leading-relaxed focus:outline-none placeholder:text-[#555]
          ${getTextStyle(block)} 
        `}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          // 한글 조합 중일 때는 이벤트를 무시하여 오동작을 방지합니다.
          if (e.nativeEvent.isComposing) return;

          // 내부 텍스트가 비어있는데 타입이 text가 아닌 경우 타입을 텍스트로 되돌립니다.
          if (
            e.key === "Backspace" &&
            block.value === "" &&
            block.type !== "text"
          ) {
            e.preventDefault();
            updateBlock(block.id, { type: "text" });
            return;
          }

          // 내부 텍스트가 비어있는데 타입이 text인 경우 블럭을 삭제하고, 이전 블럭에게 포커싱을 추가합니다.
          if (
            e.key === "Backspace" &&
            block.value === "" &&
            block.type === "text"
          ) {
            e.preventDefault();

            const prev = getPrevId(block.id);
            changeFocus(prev);

            deleteBlock(block.id);
          }

          // 엔터를 클릭한 경우 새로운 블럭을 생성하고, 새롭게 생성되는 블럭에 포커싱을 가합니다.
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const id = generateId();

            changeFocus(id);
            enter({ next: id, prev: block.id });
          }
        }}
      />
    </div>
  );
};

export default TextBlock;
