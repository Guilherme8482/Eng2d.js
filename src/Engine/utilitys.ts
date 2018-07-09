export let GRAVITY = 2

export enum Axis{
    x,
    y,
    z
}

export class Color{
    private _code: string
    constructor(color?: string){
        if(color)
            this._code = color
        else
            this.randomColor()
    }
    private randomColor(){
        let hexadecimal = '123456789ABCDEF'
        this._code = '#'
        for(let i = 0; i < 6; ++i)
            this._code += hexadecimal[Math.floor(Math.random() * 16)]
    }
    get code(){
        return this._code
    }
}