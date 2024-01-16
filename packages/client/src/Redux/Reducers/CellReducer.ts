import { ACTION_TYPES } from "../ActionTypes/CellActionTypes";
import { Action } from "../Actions/CellActions";
import { Cell, CellType } from "../Types/CellTypes";

interface CellState {
  error: string | null;
  loading: boolean;
  order: string[];
  cells: {
    [id: string]: Cell;
  };
}

const INITIAL_STATE: CellState = {
  error: null,
  loading: false,
  order: [],
  cells: {},
};

export const CellReducer = (
  state: CellState = INITIAL_STATE,
  action: Action
): CellState => {
  const { type } = action;

  switch (type) {
    case ACTION_TYPES.MOVE_CELL:
      const index = state.order.findIndex((id) => id === action.payload.id);
      const element = state.order[index];
      const orderCopy = [...state.order];
      const swapIndex =
        action.payload.direction === "up" ? index - 1 : index + 1;

      if (swapIndex >= state.order.length || swapIndex < 0) {
        return state;
      }
      const swapElement = orderCopy[swapIndex];
      orderCopy[index] = swapElement;
      orderCopy[swapIndex] = element;

      return { ...state, order: orderCopy };

    case ACTION_TYPES.UPDATE_CELL:
      return {
        ...state,
        cells: {
          ...state.cells,
          [action.payload.id]: {
            ...state.cells[action.payload.id],
            content: action.payload.content,
          },
        },
      };

    case ACTION_TYPES.ADD_CELL_AFTER:
      const newCell: Cell = createCell(action.payload.type);
      const position = state.order.findIndex((id) => id === action.payload.id);
      const newOrder = [...state.order];
      if (position === -1) {
        newOrder.push(newCell.id);
      } else {
        newOrder.splice(position + 1, 0, newCell.id);
      }
      return {
        ...state,
        order: newOrder,
        cells: { ...state.cells, [newCell.id]: { ...newCell } },
      };

    case ACTION_TYPES.DELETE_CELLS:
      const newCells = Object.keys(state.cells)
        .filter((id) => id !== action.payload)
        .reduce((acc: { [key: string]: Cell }, id: string) => {
          acc[id] = state.cells[id];
          return acc;
        }, {});

      return {
        ...state,
        order: state.order.filter((id) => id !== action.payload),
        cells: newCells,
      };

    case ACTION_TYPES.FETCH_CELLS:
      return { ...state, error: null, loading: true };

    case ACTION_TYPES.FETCH_CELLS_COMPLETE:
      const cellsOrder = action.payload.map((cell) => cell.id);

      const cellsObject = action.payload.reduce((acc, cellItem: Cell) => {
        acc[cellItem.id] = cellItem;
        return acc;
      }, {} as CellState["cells"]);

      return { ...state, order: cellsOrder, cells: cellsObject };

    case ACTION_TYPES.FETCH_CELLS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ACTION_TYPES.SAVE_CELLS_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

const createCell = (type: CellType) => {
  const randomId = Math.random().toString(36).substring(2, 5);

  const cell: Cell = {
    id: randomId,
    content: "",
    type: type,
  };

  return cell;
};
