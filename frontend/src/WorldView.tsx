import * as React from 'react';
import { ServerFrame } from './proto';

interface IProps {
    frame: ServerFrame,
    width: number,
    height: number,

    onMove: (x: number, y: number) => any,
    onSpeaking: (speaking: boolean) => any,
}

export default class WorldView extends React.Component<IProps> {

    private canvas: HTMLCanvasElement | null;
    private ctx: CanvasRenderingContext2D | null;
    private raf: number | undefined;

    public componentDidMount() {
        window.requestAnimationFrame(this.draw);
    }

    public render() {
        if (!this.raf) {
            this.raf = window.requestAnimationFrame(this.draw);
        }
        const {
            width,
            height,
        } = this.props;

        return (<canvas
            style={{
                height,
                width,
            }}
            width={width * window.devicePixelRatio}
            height={height * window.devicePixelRatio}
            onPointerMove={this.onPointerMove}
            onPointerDown={this.onPointerDown}
            onPointerUp={this.onPointerUp}
            onPointerCancel={this.onPointerCancel}
            ref={this.onRef} />);
    }

    private onRef = (canvas: HTMLCanvasElement | null) => {
        this.canvas = canvas;
        if (!canvas) { return; }
        const ctx = canvas.getContext('2d');
        this.ctx = ctx;
    }

    private draw = (t: number) => {
        this.raf = undefined;
        const {ctx} = this;
        if (!ctx) { return; }

        const {
            frame,
            width,
            height,
        } = this.props;

        ctx.fillStyle = '#000';

        ctx.clearRect(0, 0, width * window.devicePixelRatio, height * window.devicePixelRatio);
        frame.positions.forEach(pos => {
            const isSpeaking = frame.speakerId === pos.userId;
            const radius = isSpeaking ? 30 : 15;
            const fill = isSpeaking ? '#F00' : '#000';

            ctx.beginPath();
            ctx.ellipse(
                (pos.x || 0) * window.devicePixelRatio,
                (pos.y || 0) * window.devicePixelRatio,
                radius * window.devicePixelRatio,
                radius * window.devicePixelRatio,
                0,
                0, 2 * Math.PI);
            ctx.fillStyle = fill;
            ctx.fill();
            ctx.closePath();
        });
    }

    private onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!this.canvas) { return; }

        const x = e.pageX - this.canvas.offsetLeft;
        const y = e.pageY - this.canvas.offsetTop;
        this.props.onMove(x, y);
        e.preventDefault();
    }
    private onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        this.props.onSpeaking(true);
    }
    private onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
        this.props.onSpeaking(false);
    }
    private onPointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
        this.props.onSpeaking(false);
    }
}