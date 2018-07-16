import { Retention } from "./Retention";
export const GRAVITY = 9.8 / 35

export class Gravity extends Retention{
    constructor(maxX: number,maxY: number,
                retentionX?: number, retentionY?: number){
        super(maxX,maxY, retentionX, retentionY)
    }
    refresh(){
		this.current.y += GRAVITY
        if(this.current.y > this.max.y)
            this.current.y = this.max.y
        this.retain()
    }
}