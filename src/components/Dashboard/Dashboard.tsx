import React, {FunctionComponent, memo, useCallback, useContext} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import s from './style.module.css';
import {OthersCursor} from "../OthersCursor/OthersCursor";
import {WhiteBoard} from "../WhiteBoard/WhiteBoard";
import {RoomContext} from "../../App";
import {Room} from "@liveblocks/client";

const DashboardComponent: FunctionComponent<{}> = () => {
    const room = useContext(RoomContext) as Room;
    const others = useTypedSelector((state) => state.app.others);

    const pointerMoveHandler = useCallback((e) => {
        if (room) {
            room.updatePresence({cursor: { x: e.clientX, y: e.clientY }})
        }
    }, [room]);

    return (
        <div className={s.dashboard}
             onPointerMove={pointerMoveHandler}
        >
            <WhiteBoard />
            {others.map(({presence}, index: number) => (
                <OthersCursor key={index} cursor={{x: presence?.cursor?.x, y: presence?.cursor?.y}} name={presence?.name} />
            ))}
        </div>
    )
}

export const Dashboard = memo(DashboardComponent);