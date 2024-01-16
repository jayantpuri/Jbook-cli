import { ACTION_TYPES } from "../ActionTypes/CellActionTypes";
import { Action } from "../Actions/CellActions";
import { Cell, CellType, Direction } from "../Types/CellTypes";
import { Dispatch } from "redux";
import axios from "axios";
import { RootState } from "../Reducers/MainReducer";

export const addCell = (id: string | null, type: CellType) => {
  return {
    type: ACTION_TYPES.ADD_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const updateCell = (id: string, content: string) => {
  return {
    type: ACTION_TYPES.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string) => {
  return {
    type: ACTION_TYPES.DELETE_CELLS,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction) => {
  return {
    type: ACTION_TYPES.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ACTION_TYPES.FETCH_CELLS,
    });

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");

      dispatch({
        type: ACTION_TYPES.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ACTION_TYPES.FETCH_CELLS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};

export const SaveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      CellReducer: { order, cells },
    } = getState();
    const orderedCells = order.map((id) => cells[id]);

    try {
      await axios.post("/cells", { orderedCells });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({
          type: ACTION_TYPES.SAVE_CELLS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};
