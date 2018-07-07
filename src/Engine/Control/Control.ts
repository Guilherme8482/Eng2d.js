import { ControlOneTime } from "./ControlOneTime";
import { ControlPressed } from "./ControlPressed";
import { ControlMouse } from "./ControlMouse";

export class Control{
    readonly oneTime: ControlOneTime
    readonly pressed: ControlPressed
    readonly mouse: ControlMouse
    constructor(canvas: HTMLCanvasElement){
        this.oneTime = new ControlOneTime(canvas)
        this.pressed = new ControlPressed(canvas)
        this.mouse = new ControlMouse(canvas)
    }
}