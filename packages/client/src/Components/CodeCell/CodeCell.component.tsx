import React, { useEffect } from "react";
import { CodeEditor } from "../CodeEditor/CodeEditor.component";
import { CodeOutput } from "../CodeOutput/CodeOutput.component";
import { Resizable } from "../Resizable/Resizable.component";
import {
  useCellDispatch,
  useBundleDispatch,
} from "../../Hooks/useCombineDispatch";
import { useTypedSelector } from "../../Hooks/useTypedSelector";
import { useCumulativeExecute } from "../../Hooks/useCumulativeExecute";
import ActionBar from "../ActionBar/ActionBar.component";
import "./CodeCell.style.css";

interface codeCellProps {
  id: string;
}

export const CodeCell = ({ id }: codeCellProps) => {
  const { updateCell } = useCellDispatch();

  const cumulativeCode = useCumulativeExecute(id);

  const { createBundle } = useBundleDispatch();
  const bundle = useTypedSelector((state) => {
    return state.BundleReducer[id];
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(id, cumulativeCode);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, [cumulativeCode, id, createBundle]);

  const editorChange = (input: any) => {
    updateCell(id, input);
  };

  return (
    <div className="wrapper">
      <ActionBar className = {'codeCell'} id={id} />
      <Resizable direction="vertical">
        <div className="codeCellWrapper">
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue={"//Type your code here"}
              changeHandler={editorChange}
            />
          </Resizable>
          {!bundle ? (
            <div className="progress-bar-wrapper">
              <progress className="progress-bar"> ... Loading</progress>
            </div>
          ) : (
            <CodeOutput
              err={bundle.error}
              code={bundle.code}
              loading={bundle.loading}
            />
          )}
        </div>
      </Resizable>
    </div>
  );
};

