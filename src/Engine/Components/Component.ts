import { ComponentType } from '../utilitys'
import { Point } from '../Screen/references';

export class  Component{
    readonly tags = new Array<ComponentType>()
    constructor(readonly position: Point, 
                readonly size: Point){
    }
    collidesWith(component: Component): boolean{        
        if(
            (
                this.position.x >=component.position.x && this.position.x <= component.position.x + component.size.x-1 
                || this.position.x + this.size.x-1 >= component.position.x && this.position.x + this.size.x-1 <= component.position.x + component.size.x-1 
                || component.position.x >= this.position.x && component.position.x <=this.position.x + this.size.x-1
            )
            &&
            (   this.position.y >= component.position.y && this.position.y <= component.position.y + component.size.y-1 
                || this.position.y + this.size.y-1 >= component.position.y && this.position.y + this.size.y-1 <= component.position.y + component.size.y-1 
                || component.position.y >= this.position.y && component.position.y <=this.position.y + this.size.y-1
            )
        )
            return true
        else
            return false
    }
}