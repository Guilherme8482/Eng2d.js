
import { Component } from './Components/Component';
import { Scene } from './Scene';
import { Screen } from './Screen/screen'

export class Engine{
    readonly screen = new Screen()
    readonly currentScene: Scene
    readonly scenes: Array<Scene>
    
    constructor(){
        this.currentScene = new Scene('default', this.screen.canvas)
        this.scenes = [this.currentScene]
    }
    run(){
        setTimeout(window.requestAnimationFrame(this.run.bind(this)), 30) //FPS = 30

        this.currentScene.control.pressed.fireActions()

        this.renderComponents()

        this.adjustView()

        this.refreshMovables()

        this.matchEvents()
    }
    renderComponents(){
        for(let layer of this.currentScene.collection.visibles)
            for(let component of layer)
                if(this.screen.limit.collidesWith(component) && component.visible)
                    component.draw(this.screen.context)            
    }
    adjustView(){
        //...
    }
    refreshMovables(){
        for(let component of this.currentScene.collection.movables)
            component.refresh()     
    }
    matchEvents(){
        for(let componentA of this.currentScene.collection.movables)
            for(let componentB of this.currentScene.collection.all)
                if(componentA != componentB)
                    for(let tag of componentB.tags)
                        if(componentA.events.expectedTags.includes(tag))
                            componentA.events.fire(tag, componentB)
    }
}