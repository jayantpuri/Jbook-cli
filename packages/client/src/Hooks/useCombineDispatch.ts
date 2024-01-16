import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { CellActionCreators } from "../Redux/Store";
import { BundleActionCreators } from "../Redux/Store";

export const useCellDispatch = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(CellActionCreators, dispatch);
  }, [dispatch]);
};

export const useBundleDispatch = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(BundleActionCreators, dispatch);
  }, [dispatch]);
};
