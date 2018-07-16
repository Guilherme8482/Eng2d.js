import { Player } from "./Player";
import { Point } from "../../Screen/references";
import { Color } from "../../utilitys";
import { Backpack } from "../Item/Backpack";
import { Tag } from "../../Event/TagEvent";
import { Component } from "../Component";
import { Item } from "../Item/Item";
import { Engine } from "../../Engine";
const { item } = Tag

export class Backpacker extends Player{
    readonly backpack: Backpack
    readonly removeItemFromEngine: (component: Component) => void
    readonly addItemInEngine: (component: Component) => void
    constructor(position: Point, size: Point, color: Color, engine: Engine){
        if(engine){
            super(position, size, color, engine.currentScene.control)
            this.removeItemFromEngine = engine.currentScene.collection.removeComponent.bind(engine.currentScene.collection)
            this.addItemInEngine = engine.currentScene.collection.addComponent.bind(engine.currentScene.collection)
        }
        else
            super(position, size, color, undefined)
        this.backpack = new Backpack(30)
        this.events.add([item], this.takeItems.bind(this))
    }
    takeItems(components: Component[]){
        for(let item of components)
            if(this.collidesWith(item))
                if(item instanceof Item)
                    if(this.backpack.addItem(item))
                        this.removeItemFromEngine(item)
    }
    dropItem(item: Item){
        this.addItemInEngine(item)
    }
}