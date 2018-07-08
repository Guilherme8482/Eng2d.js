import { Color } from "../utilitys";
import { Visible } from "./Visible";
import { Velocity, Point } from "../Screen/references";
import { TagEvent } from "../Event/TagEvent";

export class Movable extends Visible{
    readonly velocity = new Velocity(12,100)
    readonly events = new TagEvent()
    constructor(position: Point, size: Point, color: Color){
        super(position, size, color)
    }
    refresh(): Movable{
        this.position.y += this.velocity.current.y
        this.position.x += this.velocity.current.x
        this.velocity.refresh()
        return this
    }
}