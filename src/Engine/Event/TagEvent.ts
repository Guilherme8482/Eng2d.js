import { ComponentType } from "../utilitys";
import { Component } from "../Components/Component";

export class TagEvent{
    private events: {[id: number]: (component: Component) => void}
    readonly expectedTags = new Array<any>()
    constructor(){
        this.events = {}
    }
    add(tag: Array<ComponentType> | ComponentType, action: (component: Component) => void){
        if(tag instanceof Array)
            for(let trgg of tag){
                this.events[trgg] = action
                this.expectedTags.push(trgg)
            }
        else{
            this.events[tag] = action
            this.expectedTags.push(tag)
        }
    }
    fire(tag: ComponentType, component: Component){
        this.events[tag](component)
    }
}