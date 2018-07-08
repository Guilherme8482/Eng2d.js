import { Movable } from "./Movable";
import { Point } from "../Screen/references";
import { Color, Axis } from "../utilitys";
import { Component } from "./Component";
import { Tag } from "../Event/TagEvent";
const  { solid } = Tag
const { x, y} = Axis

export class Solid extends Movable{
    constructor(position: Point, size: Point, color: Color){
        super(position, size, color)
        this.events.add([solid], this.makeCollision.bind(this))
    }
    makeCollision(components: Component[]): void{
        let crashedX: Component[] = [],
            crashedY: Component[] = [],
            cloneX = this.clone(this),
            cloneY = this.clone(this)
        cloneX.velocity.current.y = 0
        cloneX.refresh()
        cloneY.velocity.current.x = 0
        cloneY.refresh()
        for(let component of components)
            if(cloneX.collidesWith(component))
                crashedX.push(component)
            else if(cloneY.collidesWith(component))
                crashedY.push(component)
        if(crashedX.length > 0 && crashedY.length > 0){
            if(this.velocity.current.x > 0)
                this.position.x += this.shorterDistance(crashedX, x)
            else
                this.position.x -= this.shorterDistance(crashedX, x)
            if(this.velocity.current.y > 0)
                this.position.y += this.shorterDistance(crashedY, y)
            else
                this.position.y -= this.shorterDistance(crashedY, y)
            this.velocity.current.y = 0
            this.velocity.current.x = 0
            return
        }
        else if(crashedX.length > 0 ){
			if(this.velocity.current.x > 0)
				this.position.x += this.shorterDistance(crashedX, x)
			else
				this.position.x -= this.shorterDistance(crashedX, x)
			this.velocity.current.x = 0
			return
		}
		else if(crashedY.length > 0 ){
			if(this.velocity.current.y > 0)
				this.position.y += this.shorterDistance(crashedY, y)
			else
				this.position.y -= this.shorterDistance(crashedY, y)
			this.velocity.current.y = 0
			return
        }
        let shorterDistanceX, shorterDistanceY,
			cloneXY = this.clone(this),
            crashedXY: Component[] = []
		cloneXY.refresh();
		for(let component of components)
			if(this.collidesWith(component))
                crashedXY.push(component)
		if(crashedXY.length > 0){
			shorterDistanceX = this.shorterDistance(crashedXY, x)
			shorterDistanceY = this.shorterDistance(crashedXY, y)
			if(shorterDistanceX < shorterDistanceY)
				this.velocity.current.x = 0
			else if(shorterDistanceY < shorterDistanceX)
				this.velocity.current.y = 0
			else{
				this.velocity.current.y = 0
				this.velocity.current.x = 0
			}
		}
    }
    shorterDistance(components: Component[], axis: Axis): number{
        let distance = axis == x ? this.distanceX.bind(this) : this.distanceY.bind(this)
        let shorterDistance = Infinity,
            currentDistance: number
        for(let component of components){
            currentDistance = distance(component)
            if(currentDistance < shorterDistance)
                shorterDistance = currentDistance
        }
        return shorterDistance
    }
}