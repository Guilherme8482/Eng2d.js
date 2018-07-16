import { Visible } from "./Visible";
import { Movable } from "./Movable";
import { Component } from "./Component";
import { Fixed } from "./Fixed";

export class Colletcion{
    readonly visibles: Visible[][] = []
    readonly movables: Movable[] = []
    readonly notFixed: Component[] = []
    readonly all: Component[] = []
    constructor(){
    }
    addComponent(component: Component, layer?: number){
        this.all.push(component)
        if(!(component instanceof Fixed))
            this.notFixed.push(component)
        if(layer >= 0 && component instanceof Visible){
            if(!this.visibles[layer])
                this.completeLayers(layer + 1)
            this.visibles[layer].push(component)
        }
        if(component instanceof Movable)
            this.movables.push(component)
    }
    addComponents(list: Component[], layer?: number): void{
        for(let component of list)
            this.addComponent(component, layer)
    }
    completeLayers(limit: number){
        for(let i = this.visibles.length; i < limit; ++i)
            this.visibles[i] = []
    }
    removeComponent(component: Component){
        if(this.all.includes(component)){
            this.all.splice(this.all.findIndex(c => c == component), 1)
            if(component instanceof Movable)
                this.movables.splice(this.movables.findIndex(c => c == component), 1)
            if(!(component instanceof Fixed))
                this.notFixed.splice(this.notFixed.findIndex(c => c == component), 1)
            if(component instanceof Visible){
                for(let layer of this.visibles){
                    let index = layer.findIndex(c => c == component)
                    if(index != -1){
                        layer.splice(index, 1)
                        break
                    }
                }
            }
        }
    }
}