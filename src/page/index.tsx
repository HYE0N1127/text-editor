import ContentEditor from "../components/write/content/index";
import TitleEditor from "../components/write/title/index";
import { FocusProvider } from "../components/context/focus/index";
import EditorBlockCreator from "../components/write/button/index";
import { MarkdownEditorProvider } from "../components/context/editor/index";
import ImageDropZone from "../components/drag/image/index";

export const EditorPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#191919] text-[#D4D4D4]">
      <MarkdownEditorProvider>
        <FocusProvider>
          <ImageDropZone>
            <div className="mx-auto max-w-[1024px] px-24 pt-20">
              <TitleEditor />
              <ContentEditor />
              <EditorBlockCreator />
            </div>
          </ImageDropZone>
        </FocusProvider>
      </MarkdownEditorProvider>
    </div>
  );
};
