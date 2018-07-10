import { Solid } from "./Solid";
import { Point } from "../Screen/references";
import { Color } from "../utilitys";
import { Control } from "../Control/Control";
import { Component } from "./Component";
import { Axis} from "../utilitys"
const { x, y } = Axis

export class Player extends Solid{
    readonly jumpStatus: Jump
    constructor(position: Point, size: Point, color: Color, control: Control){
        super(position, size, color)
        if(control){
            control.pressed.addAction('D', this.walkRight.bind(this), 0)
            control.pressed.addAction('A', this.walkLeft.bind(this), 0)
            //control.pressed.addAction(' ', this.jump.bind(this), 200)
            control.oneTime.addAction(' ', this.jump.bind(this))
        }
        this.jumpStatus = new Jump(25, 3, this.velocity.current)
    }
    walkLeft(){
        this.velocity.increaseCurrentX(-2)
    }
    walkRight(): void{
        this.velocity.increaseCurrentX(2)
    }    
    jump(){
        this.jumpStatus.fire()
    }
    bumpedTheBottom(){
        this.jumpStatus.reset()
    }
    
}

class Jump{
    private current: number
    constructor(readonly power: number, readonly limit: number, readonly target: Point){
    }
    allow(){
        return this.current > 0
    }
    fire(){
        if(this.allow()){
            this.target.y = -this.power
            this.current--
        }
    }
    reset(){
        this.current = this.limit
    }
}