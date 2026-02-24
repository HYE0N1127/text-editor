import { useEffect, useRef } from "react";
import { generateId } from "../../../../libs/id/index";
import { useEditor } from "../../../context/editor/hooks";
import { useFocusHandler, useFocusState } from "../../../context/focus/hooks";

type Props = {
  id: string;
};

const ImageEditor = ({ id }: Props) => {
  const { setFocusId } = useFocusHandler();
  const { deleteBlock, enter } = useEditor();

  const isFocus = useFocusState() === id;
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
      setFocusId(update);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        e.stopPropagation();
        setFocusId(id);
      }}
      className="absolute inset-0 z-10 outline-none cursor-default"
    />
  );
};

export default ImageEditor;
