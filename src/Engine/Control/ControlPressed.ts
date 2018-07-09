
export class ControlPressed{
    readonly inputs: {[id: string] : Input} = {}
    constructor(canvas: HTMLCanvasElement){
        addEventListener('keydown', this.pressKey.bind(this))
        addEventListener('keyup', this.unpressKey.bind(this))
    }
    addAction(button: string, action: () => void, timeLimit: number){
        this.inputs[button[0].toUpperCase()] = new Input(action)
    }
    fireActions(): void{
        for(let i in this.inputs)
            this.inputs[i].fire()
    }
    pressKey(event: KeyboardEvent){
        let key = event.key.toUpperCase()
        if(this.inputs[key])
            this.inputs[key].setPressed(true)
    }
    unpressKey(event: KeyboardEvent){
        let key = event.key.toUpperCase()
        if(this.inputs[key])
            this.inputs[key].setPressed(false)
    }
}

class Input{
    private pressed = false
    private locked = false
    constructor(private action: () => void, readonly timeLimit?: number){
    }
    private allowed(): boolean{
        return this.pressed && !this.locked
    }
    fire(): void{
        if(this.allowed()){
            this.action()
            if(this.timeLimit){
                this.locked = true
                setTimeout(() => this.locked = false, this.timeLimit)
            }
        }
    }
    setPressed(value: boolean): void{
        this.pressed = value
    }
}