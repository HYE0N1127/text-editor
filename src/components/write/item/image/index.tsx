import { useEffect, useRef } from "react";
import { ImageBlock as ImageBlockType } from "../../../../type/index";
import { useFocusContext, useIsFocus } from "../../../context/focus/hooks";
import { useMarkdownEditor } from "../../../context/editor/hooks";
import { generateId } from "../../../../libs/id/index";

const ImageBlock = ({ block }: { block: ImageBlockType }) => {
  const { changeFocus } = useFocusContext();
  const isFocus = useIsFocus(block.id);
  const { deleteBlock, enter } = useMarkdownEditor();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocus && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      deleteBlock(block.id);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const id = generateId();

      enter({ next: id, prev: block.id });
      changeFocus(id);
    }
  };

  if (block.isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <div className="p-3 rounded-full shadow-sm">
          <svg
            className="animate-spin h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center my-2">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`relative max-w-full rounded-lg transition-all`}
        onClick={(e) => {
          e.stopPropagation();
          changeFocus(block.id);
          containerRef.current?.focus();
        }}
      >
        {isFocus && (
          <div className="absolute inset-0 bg-blue-500/30 rounded-lg pointer-events-none z-10" />
        )}
        <img
          src={block.value}
          className={`block max-w-full h-auto rounded-lg ${
            isFocus ? "outline-1 outline-zinc-500" : "outline-none"
          }`}
        />
      </div>
    </div>
  );
};

export default ImageBlock;
