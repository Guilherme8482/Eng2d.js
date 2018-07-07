import { Movable } from "./Movable";
import { Point } from "../Screen/references";
import { Color, ComponentType } from "../utilitys";
import { Component } from "./Component";
const  { ground, wall } = ComponentType

export class Solid extends Movable{
    constructor(position: Point, size: Point, color: Color){
        super(position, size, color)
        this.events.add([ground, wall], this.makeCollision.bind(this))        
    }
    makeCollision(component: Component){
         
    }
}