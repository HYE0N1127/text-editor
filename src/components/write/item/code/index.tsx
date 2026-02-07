import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { Block, CodeBlock as CodeBlockType } from "../../../../type/index";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-cshtml";
import "prismjs/themes/prism-okaidia.css";
import { useMarkdownEditor } from "../../../context/editor/hooks";
import { generateId } from "../../../../libs/id/index";
import { useFocusBlock } from "../../../context/focus/hooks";

interface Props {
  block: Block;
}

const CodeBlock = ({ block }: Props) => {
  const { updateBlock, enter } = useMarkdownEditor();
  const { changeFocus } = useFocusBlock();

  const language = (block as CodeBlockType).language || "javascript";

  return (
    <div className="relative my-4 rounded-md group transition-all duration-200 border border-[#333333] bg-[#202020]">
      {/* 언어 선택 셀렉터 */}
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
          <option value="cshtml">HTML</option>
        </select>
      </div>

      {/* code viewer */}
      <div className="[&_pre]:!bg-transparent [&_code]:!bg-transparent">
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
          }}
          textareaClassName="focus:outline-none"
          className="bg-transparent"
          onKeyDown={(e) => {
            // shift + enter가 눌리는 경우 새로운 블럭을 추가하고, 포커싱을 변경합니다.
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              const id = generateId();
              changeFocus(id);

              enter({ next: id, prev: block.id });
            }

            // 코드 에디터 내부에 값이 존재하지 않는데 백스페이스가 입력되는 경우 text 타입의 블럭으로 변경합니다.
            if (e.key === "Backspace" && block.value === "") {
              e.preventDefault();
              updateBlock(block.id, { type: "text" });
            }
          }}
        />
      </div>
    </div>
  );
};

export default CodeBlock;
