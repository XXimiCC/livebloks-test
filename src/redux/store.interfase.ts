import {LiveblocksState} from "@liveblocks/redux";
import {rootReducer} from "./rootReducer";
import {User} from "@liveblocks/client";

export type RootState = LiveblocksState<ReturnType<typeof rootReducer>>

export type AppState = {
    others: User[],
};