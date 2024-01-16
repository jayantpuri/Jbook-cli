import { combineReducers } from "redux";
import { CellReducer } from "./CellReducer";
import {BundleReducer} from './BundleReducer'

export const reducer = combineReducers({
  CellReducer,
  BundleReducer,
});

export type RootState = ReturnType<typeof reducer>;
