import { Color } from "../utilitys";
import { Visible } from "./Visible";
import { Point } from "../Screen/references";
import { TagEvent } from "../Event/TagEvent";
import { Gravity } from '../Screen/Velocity/Gravity'
import { Velocity } from "../Screen/Velocity/Velocity";

export class Movable extends Visible{
    public velocity: Velocity = new Gravity(5,50)
    readonly events = new TagEvent()
    constructor(position: Point, size: Point, color: Color){
        super(position, size, color)
    }
    refresh(){
        this.position.y += this.velocity.current.y
        this.position.x += this.velocity.current.x
        this.velocity.refresh()
    }
}