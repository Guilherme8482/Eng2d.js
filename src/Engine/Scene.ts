import { Colletcion } from "./Components/Collection";
import { Control } from "./Control/Control";

export class Scene{
    readonly collection = new Colletcion()
    readonly control: Control
    //readonly events ?
    constructor(readonly name: string, canvas: HTMLCanvasElement){
        this.control = new Control(canvas)
    }
}