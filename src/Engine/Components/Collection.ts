import { Visible } from "./Visible";
import { Movable } from "./Movable";
import { Component } from "./Component";

export class Colletcion{
    readonly visibles: Visible[][] = []
    readonly movables: Movable[] = []
    readonly all: Component[] = []
    constructor(){
    }
    addComponent(component: Component, layer?: number){
        this.all.push(component)
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
}