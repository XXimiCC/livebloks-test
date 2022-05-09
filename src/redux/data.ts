import cursor0 from '../images/cursors/cursor_0.png';
import cursor1 from '../images/cursors/cursor_1.png';
import cursor2 from '../images/cursors/cursor_2.png';

export enum NamesEnum {
    Jonh = 'Jonh',
    Elly = 'Elly',
    Alex = 'Alex',
}

export const userCursorsMap = {
    [NamesEnum.Jonh]: cursor0,
    [NamesEnum.Elly]: cursor1,
    [NamesEnum.Alex]: cursor2
}

export enum EventTypesEnum {
    movestart = 'movestart',
    move = 'move',
    moveend = 'moveend'
}