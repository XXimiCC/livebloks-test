import Konva from "konva";
import {EventTypesEnum} from "../../redux/data";
import {Room} from "@liveblocks/client";

type PointsType = number[];

export class Drawer {
    public stage: Konva.Stage;
    layer = new Konva.Layer();

    lineOptions = {
        stroke: '#df4b26',
        strokeWidth: 5,
        globalCompositeOperation: 'source-over',
        lineCap: 'round',
    } as Konva.LineConfig;

    line: Konva.Line | null = null;

    constructor(container: string) {
        const containerEl = document.getElementById(container);
        const width = containerEl?.offsetWidth ?? 1000;
        const height = containerEl?.offsetHeight ?? 1000;

        this.stage = new Konva.Stage({
            container: 'container',
            width,
            height
        });

        this.stage.add(this.layer);
    }

    subscribe(room: Room) {
        let isPaint = false;

        const unSubscribeStart = this.stage.on('mousedown touchstart', (e) => {
            const pos = this.stage.getPointerPosition();

            if (pos) {
                isPaint = true;
                const points = [pos.x, pos.y, pos.x, pos.y];
                this.startLine(points);

                room.broadcastEvent({ type: EventTypesEnum.movestart, options: {points} });
            }
        });

        const unSubscribeEnd = this.stage.on('mouseup touchend', () => {
            if (isPaint) {
                this.endLine();
                room.broadcastEvent({ type: EventTypesEnum.moveend, options: {} });
            }

            isPaint = false;
        });

        const unSubscribeMove = this.stage.on('mousemove touchmove', (e) => {
            if (!isPaint) {
                return;
            }
            // prevent scrolling on touch devices
            e.evt.preventDefault();

            const pos = this.stage.getPointerPosition();

            if (pos) {
                const points = [pos.x, pos.y];
                this.continueLine(points);
                room.broadcastEvent({ type: EventTypesEnum.move, options: {points} });
            }
        });

        return () => {
            unSubscribeStart();
            unSubscribeMove();
            unSubscribeEnd();
        }
    }

    startLine(points: PointsType) {
        const line = new Konva.Line({
            ...this.lineOptions,
            points,
        });
        this.layer.add(line);
        this.line = line;
    }

    continueLine(points: PointsType) {
        if (!this.line) return;

        const newPoints = this.line.points().concat(points);
        this.line?.points(newPoints)
    }

    endLine() {
        this.line = null;
    }
}