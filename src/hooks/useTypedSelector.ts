import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../redux/store.interfase";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
