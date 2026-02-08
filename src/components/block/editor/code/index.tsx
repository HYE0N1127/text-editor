import Editor from "react-simple-code-editor"; // 이 라이브러리는 에디터 모드에서만 로드됨
import Prism from "prismjs";
import { useEffect, useRef } from "react";
import { CodeBlock as CodeBlockType } from "../../../../type/index";
import { useMarkdownEditor } from "../../../context/editor/hooks";
import { useFocusContext, useIsFocus } from "../../../context/focus/hooks";
import { generateId } from "../../../../libs/id/index";

type Props = {
  block: CodeBlockType;
};

export const CodeEditor = ({ block }: Props) => {
  const { updateBlock, enter } = useMarkdownEditor();
  const { changeFocus } = useFocusContext();
  const isFocus = useIsFocus(block.id);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocus && containerRef.current) {
      const textarea = containerRef.current.querySelector("textarea");
      if (textarea && document.activeElement !== textarea) {
        textarea.focus();
      }
    }
  }, [isFocus]);

  const language = block.language || "javascript";

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <select
          value={language}
          onChange={(e) =>
            updateBlock(block.id, { language: e.target.value } as any)
          }
          className="rounded bg-[#333] px-2 py-1 text-xs text-[#E0E0E0] outline-none hover:bg-[#444] cursor-pointer border border-[#444]"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>
      </div>

      <Editor
        value={block.value}
        onValueChange={(code) => updateBlock(block.id, { value: code })}
        highlight={(code) => {
          const grammar =
            Prism.languages[language] || Prism.languages.plaintext;
          return Prism.highlight(code, grammar, language);
        }}
        padding={16}
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: 14,
          minHeight: "40px",
          backgroundColor: "transparent",
        }}
        className="bg-transparent"
        textareaClassName="focus:outline-none"
        onFocus={() => changeFocus(block.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            const id = generateId();

            changeFocus(id);
            enter({ next: id, prev: block.id });
          }

          if (e.key === "Backspace" && block.value === "") {
            e.preventDefault();
            updateBlock(block.id, { type: "text" });
          }
        }}
      />
    </div>
  );
};
