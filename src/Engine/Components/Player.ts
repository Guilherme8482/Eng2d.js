import { Solid } from "./Solid";
import { Point } from "../Screen/references";
import { Color } from "../utilitys";
import { Control } from "../Control/Control";

export class Player extends Solid{
    constructor(position: Point, size: Point, color: Color, control?: Control){
        super(position, size, color)
        if(control){
            control.pressed.addAction('D',this.walkRight.bind(this), 0)
            control.pressed.addAction('A',this.walkLeft.bind(this), 0)
            control.pressed.addAction(' ',this.jump.bind(this), 0)
        }
    }
    walkLeft(){
        this.velocity.increaseCurrentX(-2)
    }
    walkRight(): void{
        this.velocity.increaseCurrentX(2)
    }    
    jump(){
        this.velocity.current.y = -20
    }
}
/*
class Jump{
    readonly current = 0
    constructor(readonly power: number, readonly limit: number){
    }



}*/