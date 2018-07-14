import { Solid } from "../Solid";
import { Point, Velocity } from "../../Screen/references";
import { Color } from "../../utilitys";
import { Shooter } from "./Shooter";
import { Component } from "../Component";

class Reference{
    readonly position: Point
    readonly size: Point
    readonly isLookingToTheRight: () => boolean
    constructor(component: Shooter){
        if(component){
            this.position = component.position
            this.size = component.size
            this.isLookingToTheRight = component.isLookingToTheRight.bind(component)
        }
    }
}

export class Weapon{
    private bulletsLoaded: number
    private totalBullets: number
    private reference: Reference
    constructor(readonly capacity: number,
                reference: Shooter,
                readonly addComponent: (component: Component, layer: number) => void,
                readonly layer: number){
        this.bulletsLoaded = capacity
        this.totalBullets = capacity
        this.reference = new Reference(reference)
    }
    fire(){
        if(this.bulletsLoaded > 0){
            this.makeBullet()
            this.bulletsLoaded--
        }
        console.log('fired...', this)
    }
    reload(){
        let lackToFill = this.capacity - this.bulletsLoaded
        if(lackToFill > 0 && this.totalBullets > 0){
            if(this.totalBullets > lackToFill){
                this.bulletsLoaded += lackToFill
                this.totalBullets -= lackToFill
            }
            else{
                this.bulletsLoaded += this.totalBullets
                this.totalBullets -= this.totalBullets
            }
        }
    }
    takeBullets(amount: number){
        this.totalBullets += amount
    }
    makeBullet(){
        let startPosition = new Point(
            this.reference.position.x + this.reference.size.x * 0.5,
            this.reference.position.y + this.reference.size.y * 0.5
        )
        let bullet = new Bullet(startPosition, new Point(20,10), new Color('black'))
        if(this.reference.isLookingToTheRight())
            bullet.velocity.current.x = 8
        else
            bullet.velocity.current.x = -8
        this.addComponent(bullet, this.layer)
    }
}

export class Bullet extends Solid{
    readonly damage: number
    constructor(position: Point, size: Point, color: Color){
        super(position, size, color)
        this.velocity = new Velocity(0, 0, 0.001, 0.001)
    }
    bumpedTheTop(){}
    bumpedTheBottom(){}
    bumpedTheLeft(){}
    bumpedTheRight(){}
}