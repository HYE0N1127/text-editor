import { useRef, DragEvent, ReactNode, MouseEvent } from "react";

type Props = {
  id: string;
  children: ReactNode;
};

const Dragger = ({ id, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const target = e.target as HTMLElement;
    const isOnHandle = target.closest("[data-drag-handle]");

    if (isOnHandle) {
      ref.current.setAttribute("draggable", "true");
    } else {
      ref.current.setAttribute("draggable", "false");
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.dataset.dragging = "true";
    }

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragEnd = () => {
    if (ref.current) {
      ref.current.dataset.dragging = "false";
      ref.current.setAttribute("draggable", "false");
    }
  };

  return (
    <div
      ref={ref}
      draggable={false}
      id={id}
      data-dragging="false"
      onMouseMove={handleMouseMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="w-full"
    >
      {children}
    </div>
  );
};

export default Dragger;
