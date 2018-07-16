import { Component } from "../Components/Component";

export enum Tag {
    solid,
    player,
    ground,
    wall,
    mob,
    deadline,
    item
}

export class TagEvent{
    private events: {[id: number]: (components: Component[]) => void} = {}
    readonly expectedTags: number[] = []
    constructor(){
    }
    add(tag: Tag[], action: (components: Component[]) => void){
        for(let trgg of tag){
            this.events[trgg] = action
            this.expectedTags.push(trgg)
        }
    }
    fire(matchedComponents: {[id: number]: Component[]}): void{
        for(let i in matchedComponents)
            this.events[i](matchedComponents[i])
    }
}