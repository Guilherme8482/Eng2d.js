import { Point } from "../references";

export class Velocity{
    readonly current = new Point(0,0)
    public max: Point
    constructor(maxX: number,maxY: number){
        this.max = new Point(maxX, maxY)
    }
    refresh(){}
    increaseCurrentX(value: number){
        this.current.x += value
        if(this.current.x > this.max.x)
            this.current.x = this.max.x
        else if(this.current.x < -this.max.x)
            this.current.x = -this.max.x
    }
    increaseCurrentY(value: number){
        this.current.y += value
        if(this.current.y > this.max.y)
            this.current.y = this.max.y
        else if(this.current.y < -this.max.y)
            this.current.y = -this.max.y
    }
}