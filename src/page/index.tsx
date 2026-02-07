import ContentEditor from "../components/write/content/index";
import TitleEditor from "../components/write/title/index";
import { IsFocusProvider } from "../components/context/focus/index";
import EditorBlockCreator from "../components/write/button/index";

export const EditorPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#191919] text-[#D4D4D4]">
      <div className="mx-auto max-w-[1024px] px-24 pt-20">
        <IsFocusProvider>
          <TitleEditor />

          <ContentEditor />
          <EditorBlockCreator />
        </IsFocusProvider>
      </div>
    </div>
  );
};
