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

        this.canvas.height = window.innerHeight
        this.canvas.width = window.innerWidth
        this.limit.size.y = window.innerHeight
        this.limit.size.x = window.innerWidth
        this.view.size.y = window.innerHeight - 50
        this.view.size.x = window.innerWidth - 50
    }
    get context(): CanvasRenderingContext2D{
        return this.canvas.getContext('2d')
    }
}