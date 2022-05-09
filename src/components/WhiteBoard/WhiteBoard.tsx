import React, {FunctionComponent, memo, useContext, useEffect, useRef} from 'react';
import s from './style.module.css';
import {EventTypesEnum} from "../../redux/data";
import {RoomContext} from "../../App";
import {Room} from "@liveblocks/client";
import {Drawer} from "../Drawer/Drawer";

const WhiteBoardComponent: FunctionComponent<{}> = () => {
    const drawerRef = useRef<Drawer>();
    const room = useContext(RoomContext) as Room;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        drawerRef.current = new Drawer('container');

        const unsubscribe = room.subscribe('event', ({ event }) => {
            if (event.type === EventTypesEnum.movestart) {
                drawerRef.current?.startLine(event.options.points);
            } else if (event.type === EventTypesEnum.move) {
                drawerRef.current?.continueLine(event.options.points);
            } else if (event.type === EventTypesEnum.moveend) {
                drawerRef.current?.endLine();
            }
        });

        return () => {
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        return drawerRef.current?.subscribe(room);
    }, [drawerRef.current]);


    return (
        <div id="container" ref={containerRef} className={s.container}>
        </div>
    );
}

export const WhiteBoard = memo(WhiteBoardComponent);