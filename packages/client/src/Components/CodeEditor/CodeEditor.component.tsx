import React, { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import './CodeEditor.style.css';

interface editorProps {
  initialValue: string;
  changeHandler: (input: string) => void;
}

export const CodeEditor = ({ initialValue, changeHandler }: editorProps) => {
  const editor = useRef<any>();

  const editorDidMount: EditorDidMount = (getEditorValue, MonacoEditor) => {
    editor.current = MonacoEditor;
    MonacoEditor.onDidChangeModelContent(() => {
      changeHandler(getEditorValue());
    });
  };

  const formatCode = () => {
    const code = editor.current.getModel().getValue();
    const formatted = prettier.format(code, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
    });

    editor.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button className="button-format" onClick={formatCode}>Format</button>
      <MonacoEditor
        editorDidMount={editorDidMount}
        height= "100%"
        theme="dark"
        value={initialValue}
        language="javascript"
        options={{
          wordWrap: "on",
        }}
      />
    </div>
  );
};
