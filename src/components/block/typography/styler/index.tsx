import { BlockType } from "../../../../type/tree/index";
import { getTextStyle } from "../../editor/text/helpers";
import { renderFormattedText } from "./helper";

type Props = {
  value: string;
  type: BlockType;
};

export const Styler = ({ value, type }: Props) => {
  const defaultStyle = `block w-full p-0 break-words whitespace-pre-wrap ${getTextStyle(type)}`;

  return (
    <div className={`text-[#D4D4D4] cursor-text ${defaultStyle}`}>
      {value === "" ? <br /> : renderFormattedText(value)}
    </div>
  );
};
