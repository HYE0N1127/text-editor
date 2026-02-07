import { MarkdownEditorProvider } from "./components/context/editor/index";
import { EditorPage } from "./page/index";

function App() {
  return (
    <div className="w-full flex justify-center">
      <MarkdownEditorProvider>
        <EditorPage />
      </MarkdownEditorProvider>
    </div>
  );
}

export default App;
