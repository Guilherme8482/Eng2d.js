import { GRAVITY } from "../utilitys";

export class Point{
    constructor(public x: number, public y: number){
    }
}
export class Velocity{
    readonly current = new Point(0,0)
    readonly max: Point
    readonly acceleration: Point
    constructor(maxX: number,maxY: number,
                accelerationX?: number, accelerationY?: number){
        this.max = new Point(maxX, maxY)
        if(accelerationX && accelerationY)
            this.acceleration = new Point(accelerationX, accelerationY)
        else
            this.acceleration = new Point(1,1)

    }
    refresh(){
		this.current.y += GRAVITY
        if(this.current.y > this.max.y)
            this.current.y = this.max.y

        if(this.current.x >= -1 && this.current.x <= 1)
            this.current.x = 0
        else if(this.current.x < 0)
            this.current.x += this.acceleration.x
        else
            this.current.x -= this.acceleration.x
    }
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