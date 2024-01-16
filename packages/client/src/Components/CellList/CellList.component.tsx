import React, { useEffect } from "react";
import CellListItem from "../CellListItem/CellListItem.component";
import { useTypedSelector } from "../../Hooks/useTypedSelector";
import AddCell from "../AddCell/AddCell.component";
import { useCellDispatch } from "../../Hooks/useCombineDispatch";

const CellList = () => {
  const { fetchCells } = useCellDispatch();

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const cellOrder = useTypedSelector((state) => {
    const cellsReducer = state.CellReducer;
    const { order, cells } = cellsReducer;
    return cellsReducer ? order.map((id) => cells[id]) : [];
  });

  return (
    <div>
      {cellOrder.length === 0 && <AddCell id={null} />}
      {cellOrder.map((cell) => {
        return <CellListItem cell={cell} key={cell.id} />;
      })}
    </div>
  );
};

export default CellList;
