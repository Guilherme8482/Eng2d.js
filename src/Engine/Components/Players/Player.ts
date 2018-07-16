import { Solid } from "../Solid";
import { Point } from "../../Screen/references";
import { Color } from "../../utilitys";
import { Control } from "../../Control/Control";

export class Player extends Solid{
    readonly jumpStatus: Jump
    constructor(position: Point, size: Point, color: Color, control: Control){
        super(position, size, color)
        if(control){
            control.pressed.addAction('D', this.walkRight.bind(this), 0)
            control.pressed.addAction('A', this.walkLeft.bind(this), 0)
            control.oneTime.addAction(' ', this.jump.bind(this))
        }
        this.jumpStatus = new Jump(14, 3, this.velocity.current)
    }
    walkLeft(){
        this.velocity.increaseCurrentX(-0.3)
    }
    walkRight(): void{
        this.velocity.increaseCurrentX(0.3)
    }
    jump(){
        this.jumpStatus.fire()
    }
    bumpedTheBottom(){
        this.jumpStatus.reset()
    }
}
class Jump{
    public current = 0
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