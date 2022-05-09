import {combineReducers} from "redux";
import appSlice from "./appSlice";

export const rootReducer = combineReducers({
    app: appSlice.reducer
});