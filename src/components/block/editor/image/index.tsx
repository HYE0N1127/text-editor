import { useEffect, useRef } from "react";
import { useFocusContext, useIsFocus } from "../../../context/focus/hooks";
import { generateId } from "../../../../libs/id/index";
import { useEditor } from "../../../context/editor/hooks";

type Props = {
  id: string;
};

const ImageEditor = ({ id }: Props) => {
  const { changeFocus } = useFocusContext();
  const { deleteBlock, enter } = useEditor();

  const isFocus = useIsFocus(id);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isFocus && containerRef.current) {
      containerRef.current.focus({ preventScroll: true });
    }
  }, [isFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();

      deleteBlock(id);
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const update = generateId();

      enter({ next: update, prev: id });
      changeFocus(update);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        e.stopPropagation();
        changeFocus(id);
      }}
      className="absolute inset-0 z-10 outline-none cursor-default"
    />
  );
};

export default ImageEditor;
