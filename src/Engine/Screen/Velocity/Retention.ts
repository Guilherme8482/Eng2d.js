import { Velocity } from "./Velocity";
import { Point } from "../references";

export class Retention extends Velocity{
    readonly retention: Point
    constructor(maxX: number,maxY: number,
                retentionX?: number, retentionY?: number){
        super(maxX, maxY)
        if(retentionX && retentionY)
            this.retention = new Point(retentionX, retentionY)
        else
            this.retention = new Point(0.1,0.1)
    }
    retain(){
        if(this.current.x >= -this.retention.x && this.current.x <= this.retention.x)
            this.current.x = 0
        else if(this.current.x < 0)
            this.current.x += this.retention.x
        else
            this.current.x -= this.retention.x
        if(this.current.y >= -this.retention.y && this.current.y <= this.retention.y)
            this.current.y = 0
        else if(this.current.y < 0)
            this.current.y += this.retention.y
        else
            this.current.y -= this.retention.y
    }
}