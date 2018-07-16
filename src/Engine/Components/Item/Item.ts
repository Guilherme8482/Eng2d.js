import { Movable } from "../Movable";
import { Point } from "../../Screen/references";
import { Color } from "../../utilitys";
import { Velocity } from "../../Screen/Velocity/Velocity";

export class Item extends Movable{
	readonly id: number
	readonly currentFrame = new Point(0, 10)
	readonly frameLimit = new Point(22, 22)
    constructor(position: Point, size: Point, speedShaking: number){
        super(position, size, new Color())
		this.velocity = new Velocity(6, 12)
		this.velocity.current.x = speedShaking
		this.velocity.current.y = speedShaking
    }
    refresh(){
		this.currentFrame.x++
		this.currentFrame.y++
		if(this.currentFrame.x > this.frameLimit.x){
			this.currentFrame.x = 0
			this.velocity.current.x *= -1
		}
		if(this.currentFrame.y > this.frameLimit.y){
			this.currentFrame.y = 0
			this.velocity.current.y *= -1
		}
		this.position.x += this.velocity.current.x
		this.position.y += this.velocity.current.y
		this.velocity.refresh()
    }
}