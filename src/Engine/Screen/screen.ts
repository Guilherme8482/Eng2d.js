import { Point } from './references'
import { Component } from '../Components/Component';

export class Screen{
    readonly canvas: HTMLCanvasElement
    readonly limit: Component
    readonly view: Component
    constructor(fixedResolution?: Point){
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)

        this.limit = new Component(new Point(0,0), new Point(0,0))
        this.view = new Component(new Point(0,0), new Point(0,0))

        if(fixedResolution){
            this.canvas.height = fixedResolution.y
            this.canvas.width = fixedResolution.x
        }
        else{
            this.resize()
            addEventListener('resize', this.resize.bind(this))
        }
    }
    resize(event?: Event): void{
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.limit.size.x = window.innerWidth
        this.limit.size.y = window.innerHeight

        this.view.position.x = 0.1 * window.innerWidth
        this.view.position.y = 0.1 * window.innerHeight
        this.view.size.x = 0.8 * window.innerWidth
        this.view.size.y = 0.8 * window.innerHeight
    }
    get context(): CanvasRenderingContext2D{
        return this.canvas.getContext('2d')
    }    
    clearCanvas(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}