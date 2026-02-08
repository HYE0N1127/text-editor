import { PropsWithChildren } from "react";

const Block = ({ children }: PropsWithChildren) => {
  return <div className="group relative w-full">{children}</div>;
};

export default Block;
