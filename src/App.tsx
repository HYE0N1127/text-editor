import { MarkdownEditorProvider } from "./components/context/editor/index";
import { EditorPage } from "./page/index";

function App() {
  return (
    <div className="w-full flex justify-center">
      <EditorPage />
    </div>
  );
}

export default App;
