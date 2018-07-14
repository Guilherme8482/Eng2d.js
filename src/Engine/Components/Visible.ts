import { Component } from "./Component";
import { Color } from "../utilitys";
import { Point } from "../Screen/references";

export class Visible extends Component{
    public visible = true
    constructor(position: Point, size: Point, readonly color: Color){
        super(position, size)
    }
    draw(canvas: CanvasRenderingContext2D){
        canvas.fillStyle = this.color.code
        canvas.fillRect(this.position.x,
                        this.position.y,
                        this.size.x,
                        this.size.y)
    }
}