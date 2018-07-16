import { Movable } from "./Movable";
import { Point, Axis } from "../Screen/references";
import { Color } from "../utilitys";
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
            this.approximateInX(this.closerComponent(crashedX, x))
            this.approximateInY(this.closerComponent(crashedY, y))
            return
        }
        else if(crashedX.length > 0 ){
            this.approximateInX(this.closerComponent(crashedX, x))
			return
		}
		else if(crashedY.length > 0 ){
            this.approximateInY(this.closerComponent(crashedY, y))
			return
        }
        let cloneXY = this.clone(this),
            crashedXY: Component[] = []
		cloneXY.refresh();
		for(let component of components)
			if(cloneXY.collidesWith(component))
                crashedXY.push(component)
		if(crashedXY.length > 0){
            let closerInX = this.closerComponent(crashedXY, x),
                closerInY = this.closerComponent(crashedXY, y),
                shorterDistanceX = this.distanceX(closerInX),
			    shorterDistanceY = this.distanceY(closerInY)
			if(shorterDistanceX < shorterDistanceY)
                this.approximateInX(closerInX)
			else if(shorterDistanceY < shorterDistanceX)
                this.approximateInY(closerInY)
			else{
                this.approximateInX(closerInX)
                this.approximateInY(closerInY)
			}
		}
    }
    approximateInX(component: Component){
        let distance = this.distanceX(component)
        if(this.velocity.current.x > 0){
            this.position.x += distance
            this.bumpedTheRight(component)
        }
        else{
            this.position.x -= distance
            this.bumpedTheLeft(component)
        }
        this.velocity.current.x = 0
    }
    approximateInY(component: Component){
        let distance = this.distanceY(component)
        if(this.velocity.current.y > 0){
            this.position.y += distance
            this.bumpedTheBottom(component)
        }
        else{
            this.position.y -= distance
            this.bumpedTheTop(component)
        }
        this.velocity.current.y = 0
    }
    bumpedTheTop(component: Component){}
    bumpedTheBottom(component: Component){}
    bumpedTheLeft(component: Component){}
    bumpedTheRight(component: Component){}
    closerComponent(components: Component[], axis: Axis): Component{
        let distance: (component: Component) => number = axis == x ? this.distanceX.bind(this) : this.distanceY.bind(this),
            closerComponent: Component,
            shorterDistance = Infinity,
            currentDistance: number
        for(let component of components){
            currentDistance = distance(component)
            if(currentDistance < shorterDistance){
                shorterDistance = currentDistance
                closerComponent = component
            }
        }
        return closerComponent
    }
}