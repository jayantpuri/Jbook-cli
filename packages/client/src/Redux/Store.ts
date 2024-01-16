import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./Reducers/MainReducer";

export const store = legacy_createStore(reducer, {}, applyMiddleware(thunk));

export * as CellActionCreators from "./ActionCreators/CellActionCreator";
export * as BundleActionCreators from "./ActionCreators/BundleActionCreator";
