import { BUNDLE_ACTION_TYPES } from "../ActionTypes/BundleActionTypes";
import { BUNDLE_ACTIONS } from "../Actions/BundleActions";
import { Dispatch } from "redux";
import { EsbuildService } from "../../Services/EsbuildService";

export const createBundle = (cellId: string, cellContent: string) => {
  return async (dispatch: Dispatch<BUNDLE_ACTIONS>) => {
    dispatch({
      type: BUNDLE_ACTION_TYPES.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    try {
      const { code, err } = await EsbuildService(cellContent);
      dispatch({
        type: BUNDLE_ACTION_TYPES.BUNDLE_FINISH,
        payload: {
          cellId,
          code,
          error: err,
        },
      });
    } catch (error: any) {
        dispatch({
            type: BUNDLE_ACTION_TYPES.BUNDLE_ERROR,
            payload: {
                cellId,
                error: error.message,
            }
        })
    }
  };
};
