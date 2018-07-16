import { Point } from '../Screen/references';
import { Tag } from '../Event/TagEvent';

export class  Component{
    readonly tags: Tag[] = []
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
    clone<T>(component: T): T{
        let newComponent = new (<any>component.constructor)()
        for(let attribute in component)
            if(!(component[attribute] instanceof Function))
                if(component[attribute] instanceof Object)
                    newComponent[attribute] = this.clone(component[attribute])
                else
                    newComponent[attribute] = component[attribute]
        return newComponent
    }
    distanceX(component: Component): number{
        let distance
		if(this.position.x < component.position.x)
			distance = component.position.x - (this.position.x + this.size.x)
		else
			distance = this.position.x - (component.position.x + component.size.x)
        return distance < 0 ? 0 : distance
    }
    distanceY(component: Component): number{
        let distance
		if(this.position.y < component.position.y)
			distance = component.position.y - (this.position.y + this.size.y)
		else
			distance = this.position.y - (component.position.y + component.size.y)
        return distance < 0 ? 0 : distance
    }
    addTag(newTag: Tag): Component{
        if(!this.tags.includes(newTag))
            this.tags.push(newTag)
        return this
    }
    addTags(tags: Tag[]){
        for(let tag of tags)
            this.addTag(tag)
        return this
    }
}