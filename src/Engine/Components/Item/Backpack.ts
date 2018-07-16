import { Item } from "./Item";

export class Backpack{
    readonly items: Item[] = []
    constructor(readonly limit: number){
    }
    addItem(item: Item): boolean{
        if(this.items.length < this.limit){
            this.items.push(item)
            return true
        }
        else
            return false
    }
}