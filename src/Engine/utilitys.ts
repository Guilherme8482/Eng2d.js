export class Color{
    private _code: string
    constructor(color?: string){
        if(color)
            this._code = color
        else
            this.randomColor()
    }
    private randomColor(){
        let hexadecimal = '0123456789ABCDEF'
        this._code = '#'
        for(let i = 0; i < 6; ++i)
            this._code += hexadecimal[Math.floor(Math.random() * 16)]
    }
    get code(){
        return this._code
    }
}