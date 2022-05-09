import {AppState} from "./store.interfase";
import {createSlice} from "@reduxjs/toolkit";

const initialState: AppState = {
    others: []
} as AppState;

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setOthers(state, {payload}) {
            state.others = payload;
        },
    },
});

export const { setOthers } = appSlice.actions;

export default appSlice;