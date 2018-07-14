import { Player } from "./Player";
import { Point } from "../../Screen/references";
import { Color } from "../../utilitys";
import { Engine } from "../../Engine";
import { Weapon } from "./Weapon";

export class Shooter extends Player{
    readonly weapon: Weapon
    private lookingToTheRight: boolean
    constructor(position: Point, size: Point, color: Color, engine: Engine, layer: number){
        if(engine){
            super(position, size, color, engine.currentScene.control)
            this.weapon = new Weapon(10, this, engine.currentScene.collection.addComponent.bind(engine.currentScene.collection), layer)
            engine.currentScene.control.oneTime.addAction('E', this.weapon.fire.bind(this.weapon))
            engine.currentScene.control.oneTime.addAction('R', this.weapon.reload.bind(this.weapon))
        }
        else
            super(position, size, color, undefined)
        this.lookingToTheRight = true
    }
    refresh(){
        this.position.y += this.velocity.current.y
        this.position.x += this.velocity.current.x
        this.velocity.refresh()
        if(this.velocity.current.x > 0)
            this.lookingToTheRight = true
        else if(this.velocity.current.x < 0)
            this.lookingToTheRight = false
    }
    isLookingToTheRight(){
        return this.lookingToTheRight
    }
    draw(canvas: CanvasRenderingContext2D){
        canvas.fillStyle = this.color.code
        canvas.fillRect(this.position.x,
                        this.position.y,
                        this.size.x,
                        this.size.y)
            canvas.fillStyle = "black";
        if(this.isLookingToTheRight())
            canvas.fillRect(this.position.x + (0.6 * this.size.x),
                            this.position.y,
                            this.size.x -(0.6 * this.size.x), 
                            0.5 * this.size.y
            )
        else
            canvas.fillRect(this.position.x, 
                            this.position.y,
                            this.size.x -(0.6 * this.size.x), 
                            0.5 * this.size.y
            )
    }
}