
export class ControlOneTime{
    readonly inputs: {[id: string] : () => void}
    constructor(canvas: HTMLCanvasElement){
        canvas.addEventListener('keypress', this.fireAction.bind(this))
    }
    addAction(button: string, action: () => void){
        this.inputs[button[0].toUpperCase()] = action
    }
    fireAction(event: KeyboardEvent): void{
        let key = event.key.toUpperCase()
        if(this.inputs[key])
            this.inputs[key]()
    }
}