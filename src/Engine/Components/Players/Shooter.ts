import { Point } from "../../Screen/references";
import { Color } from "../../utilitys";
import { Engine } from "../../Engine";
import { Weapon } from "../Item/Weapon";
import { Backpacker } from "./Backpaker";

export class Shooter extends Backpacker{
    readonly weapon: Weapon
    private lookingToTheRight: boolean
    constructor(position: Point, size: Point, color: Color, engine: Engine, layer: number){
        if(engine){
            super(position, size, color, engine)
            this.weapon = new Weapon(10, this,
                                engine.currentScene.collection.addComponent.bind(engine.currentScene.collection),
                                engine.currentScene.collection.removeComponent.bind(engine.currentScene.collection),
                                layer)
            engine.currentScene.control.oneTime.addAction('E', this.weapon.fire.bind(this.weapon))
            engine.currentScene.control.oneTime.addAction('R', this.weapon.reload.bind(this.weapon))
        }
        else
            super(position, size, color, undefined)
        this.lookingToTheRight = true
    }
    refresh(): void{
        this.position.y += this.velocity.current.y
        this.position.x += this.velocity.current.x
        this.refreshLookingSide()
        this.velocity.refresh()
    }
    refreshLookingSide(): void{
        if(this.velocity.current.x > 0)
            this.lookingToTheRight = true
        else if(this.velocity.current.x < 0)
            this.lookingToTheRight = false
    }
    isLookingToTheRight(): boolean{
        return this.lookingToTheRight
    }
    draw(canvas: CanvasRenderingContext2D): void{
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