import { PropsWithChildren } from "react";
import { useFocusContext } from "../context/focus/hooks";

type Props = { id: string } & PropsWithChildren;

const Block = ({ id, children }: Props) => {
  const { changeFocus } = useFocusContext();

  return (
    <div
      className="group relative w-full py-1"
      onClick={(e) => {
        e.stopPropagation();
        changeFocus(id);
      }}
    >
      {children}
    </div>
  );
};

export default Block;
