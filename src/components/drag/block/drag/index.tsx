import { DragEvent, ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
};

const Dragger = ({ id, children }: Props) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.setAttribute("data-dragging", "true");
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.setAttribute("data-dragging", "false");
  };

  return (
    <div
      id={id}
      draggable={true}
      data-dragging="false"
      className="w-full"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </div>
  );
};

export default Dragger;
