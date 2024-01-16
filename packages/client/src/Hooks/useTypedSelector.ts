import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../Redux/Reducers/MainReducer";
import { useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
