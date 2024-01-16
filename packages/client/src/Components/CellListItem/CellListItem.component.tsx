import React from "react";
import { Cell } from "../../Redux/Types/CellTypes";
import { CodeCell } from "../CodeCell/CodeCell.component";
import { TextEditor } from "../TextEditor/TextEditor.component";
import AddCell from "../AddCell/AddCell.component";
import "./CellListItem.style.css"

interface CellListProps {
  cell: Cell;
}
const CellListItem = ({ cell }: CellListProps) => {
  return (
    <div>
      <AddCell id={cell.id} />
      
      {cell.type === "code" ? (
        <>
        <div className="code-cell-style"> </div>
        <CodeCell id={cell.id} />
        </>
      ) : (
        <TextEditor id={cell.id} />
      )}
    </div>
  );
};

export default CellListItem;
