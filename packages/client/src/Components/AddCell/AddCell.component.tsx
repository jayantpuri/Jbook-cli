import React from "react";
import "./AddCell.style.css";
import { useCellDispatch } from "../../Hooks/useCombineDispatch";
import { CellType } from "../../Redux/Types/CellTypes";

interface addCellProps {
  id: string | null;
}

const AddCell = ({ id }: addCellProps) => {
  const { addCell } = useCellDispatch();
  const handleAddCell = (cellType: CellType) => {
    addCell(id, cellType);
  };
  return (
    <div className="add-cell-wrapper">
      <button className="button" onClick={() => handleAddCell('text')}>
        Text
      </button>
      <button className="button" onClick={() => handleAddCell('code')}>
        Code
      </button>
      <div className="line-horizontal"></div>
    </div>
  );
};

export default AddCell;
