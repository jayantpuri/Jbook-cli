import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./ActionBar.style.css";
import { useCellDispatch } from "../../Hooks/useCombineDispatch";

interface actionBarProps {
  id: string;
  className?: string
}

const ActionBar = ({ id , className }: actionBarProps) => {
  const { moveCell, deleteCell } = useCellDispatch();
  return (
    <div className={`action-bar-wrapper ${className}`}>
      <button className="action-bar-button" onClick={() => moveCell(id, "up")}>
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button className="action-bar-button" onClick={() => moveCell(id, "down")}>
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className="action-bar-button" onClick={() => deleteCell(id)}>
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
