import { BUNDLE_ACTION_TYPES } from "../ActionTypes/BundleActionTypes";

interface BundleStart {
  type: BUNDLE_ACTION_TYPES.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

interface BundleFinish {
  type: BUNDLE_ACTION_TYPES.BUNDLE_FINISH;
  payload: {
    cellId: string;
    code: string;
    error: string;
  };
}

interface BundleError {
  type: BUNDLE_ACTION_TYPES.BUNDLE_ERROR;
  payload: {
    cellId: string;
    error: string;
  };
}

export type BUNDLE_ACTIONS = BundleError | BundleFinish | BundleStart;
