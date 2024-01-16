import { BUNDLE_ACTION_TYPES } from "../ActionTypes/BundleActionTypes";
import { BUNDLE_ACTIONS } from "../Actions/BundleActions";

interface BundleState {
  [key: string]: {
    code: string;
    loading: boolean;
    error: string;
  };
}

const INITIAL_STATE = {};

export const BundleReducer = (
  state: BundleState = INITIAL_STATE,
  action: BUNDLE_ACTIONS
) => {
  const { type, payload } = action;

  switch (type) {
    case BUNDLE_ACTION_TYPES.BUNDLE_START: {
      const { cellId } = payload;
      return {
        ...state,
        [cellId]: {
          code: "",
          error: "",
          loading: true,
        },
      };
    }

    case BUNDLE_ACTION_TYPES.BUNDLE_FINISH: {
      const { code, error, cellId } = payload;
      return {
        ...state,
        [cellId]: {
          code: code,
          loading: false,
          error: error,
        },
      };
    }

    case BUNDLE_ACTION_TYPES.BUNDLE_ERROR: {
      const { cellId, error } = payload;
      return {
        ...state,
        [cellId]: { ...state[cellId], error: error },
      };
    }
    default: {
      return state;
    }
  }
};
