import { Fixed } from "../Fixed";
import { Color } from "../../utilitys";
import { Point } from "../../Screen/references";

export class Panel extends Fixed{
    constructor(position: Point, size: Point, readonly template: () => string){
        super(position, size, new Color('black'))
    }
    draw(canvas: CanvasRenderingContext2D){
        canvas.font = this.size.y + 'pt Arial'
		canvas.fillStyle = this.color.code
		canvas.fillText(this.template(), this.position.x, this.position.y)
    }
}