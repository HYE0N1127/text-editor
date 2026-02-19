import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { useEffect, useRef } from "react";
import { CodeBlock as CodeBlockType } from "../../../../type/tree/index";
import { useFocusContext, useIsFocus } from "../../../context/focus/hooks";
import { generateId } from "../../../../libs/id/index";
import { useEditor } from "../../../context/editor/hooks";

type Props = {
  id: string;
  block: CodeBlockType;
};

const CodeEditor = ({ id, block }: Props) => {
  const { updateBlock, enter } = useEditor();
  const { changeFocus } = useFocusContext();
  const isFocus = useIsFocus(id);

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
          onChange={(e) => updateBlock(id, { language: e.target.value } as any)}
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
        onValueChange={(code) => updateBlock(id, { value: code })}
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
        onFocus={() => changeFocus(id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            const created = generateId();

            changeFocus(created);
            enter({ next: created, prev: id });
          }

          if (e.key === "Backspace" && block.value === "") {
            e.preventDefault();
            updateBlock(id, { type: "text" });
          }
        }}
      />
    </div>
  );
};

export default CodeEditor;
