import { PropsWithChildren } from "react";

type Props = { type: string } & PropsWithChildren;

const Text = ({ type, children }: Props) => {
  const styles: Record<string, string> = {
    h1: "text-4xl font-bold text-gray-900 mb-4",
    h2: "text-2xl font-semibold mb-2",
    h3: "text-xl font-medium mb-1",
    quote: "text-base l-4 ",
    text: "text-base",
  };

  return (
    <div
      className={`group relative flex w-full items-start py-1 text-white l-4 ${
        styles[type] || styles.text
      }`}
    >
      {type === "quote" && (
        <div className="mr-3 w-[3px] shrink-0 self-stretch rounded-full bg-gray-300 dark:bg-gray-600" />
      )}

      {type === "bullet" && (
        <div className="mr-2 flex h-7 w-5 shrink-0 items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        </div>
      )}

      {children}
    </div>
  );
};

export default Text;
