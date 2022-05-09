import React, {FunctionComponent, memo} from 'react';
import s from "./style.module.css";
import {NamesEnum, userCursorsMap} from "../../redux/data";

type OthersCursorPropsType = {
    cursor: {x: number, y: number},
    name: NamesEnum,
}

const OthersCursorComponent: FunctionComponent<OthersCursorPropsType> = ({cursor, name}) => {
    return (
        <div className={s.cursorWrapper} style={{ left: cursor.x, top: cursor.y}}>
            <img src={name && userCursorsMap[name]} className={s.pointer} alt="cursor" />
            <span>{name}</span>
        </div>
    )
}

export const OthersCursor = memo(OthersCursorComponent);