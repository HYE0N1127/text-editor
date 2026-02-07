import { Block } from "../../../../type/index";

const ImageBlock = ({ block }: { block: Block }) => {
  return (
    <div className="py-2">
      <img
        src={block.value}
        alt="User uploaded"
        className="max-w-full rounded-md shadow-sm opacity-90 hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

export default ImageBlock;
