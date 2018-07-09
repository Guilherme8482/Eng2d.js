import { Colletcion } from "./Components/Collection";
import { Control } from "./Control/Control";
import { Component } from "./Components/Component";

export class Scene{
    public screenTarget: Component
    readonly collection = new Colletcion()
    readonly control: Control
    //readonly events ?
    constructor(readonly name: string, canvas: HTMLCanvasElement){
        this.control = new Control(canvas)
    }    
    setScreenTarget(target: Component){
        this.screenTarget = target
    }
}