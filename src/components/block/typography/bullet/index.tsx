import { PropsWithChildren } from "react";
import { Block } from "../../../../type/index";

type Props = {
  block: Block;
} & PropsWithChildren;

export const Bullet = ({ block, children }: Props) => {
  const style = "text-base text-white w-full";

  return (
    <div className={`group relative flex w-full items-start py-0.5`}>
      <div className="mr-2 flex h-6 w-5 shrink-0 items-center justify-center">
        <div className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-white" />
      </div>

      {children ? (
        <div className={style}>{children}</div>
      ) : (
        <p className={style}>{block.value}</p>
      )}
    </div>
  );
};

export default Bullet;
