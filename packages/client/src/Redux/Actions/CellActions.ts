import { ACTION_TYPES } from "../ActionTypes/CellActionTypes";
import { CellType, Direction, Cell } from "../Types/CellTypes";

interface AddCell {
  type: ACTION_TYPES.ADD_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellType;
  };
}

interface DeleteCell {
  type: ACTION_TYPES.DELETE_CELLS;
  payload: string;
}

interface MoveCell {
  type: ACTION_TYPES.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

interface UpdateCell {
  type: ACTION_TYPES.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

interface FetchCells {
  type: ACTION_TYPES.FETCH_CELLS;
}

interface FetchCellsComplete {
  type: ACTION_TYPES.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

interface FetchCellsError {
  type: ACTION_TYPES.FETCH_CELLS_ERROR;
  payload: string;
}

interface SaveCells {
  type: ACTION_TYPES.SAVE_CELLS;
}

interface SaveCellsError {
  type: ACTION_TYPES.SAVE_CELLS_ERROR;
  payload: string;
}

export type Action =
  | AddCell
  | DeleteCell
  | MoveCell
  | UpdateCell
  | FetchCells
  | FetchCellsComplete
  | SaveCells
  | SaveCellsError
  | FetchCellsError;
