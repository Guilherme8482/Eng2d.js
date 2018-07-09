
import { Component } from './Components/Component';
import { Scene } from './Scene';
import { Screen } from './Screen/screen'

export class Engine{
    readonly screen = new Screen()
    readonly currentScene: Scene
    readonly scenes: Scene[]

    constructor(){
        this.currentScene = new Scene('default', this.screen.canvas)
        this.scenes = [this.currentScene]
    }
    run(){
        let fps = 60
        setTimeout(() => window.requestAnimationFrame(this.run.bind(this)), 1 / fps)
        
        //console.time('run()')
        this.currentScene.control.pressed.fireActions()
        this.renderComponents()
        this.adjustView()
        this.matchEvents()        
        this.refreshMovables()        
        this.matchEvents()
        //console.timeEnd('run()')
    }
    renderComponents(){
        this.screen.clearCanvas()
        for(let layer of this.currentScene.collection.visibles)
            for(let component of layer)
                if(this.screen.limit.collidesWith(component) && component.visible)
                    component.draw(this.screen.context)
    }
    adjustView(){
        let height = 0, width = 0, a , b;
		if(this.currentScene.screenTarget.position.x < this.screen.view.position.x || this.currentScene.screenTarget.position.x + this.currentScene.screenTarget.size.x-1 > this.screen.view.position.x + this.screen.view.size.x-1){
			if(this.currentScene.screenTarget.position.x > this.screen.view.position.x)
				a = this.currentScene.screenTarget.position.x - this.screen.view.position.x
			else
				a = this.screen.view.position.x - this.currentScene.screenTarget.position.x
			
			if(this.currentScene.screenTarget.position.x + this.currentScene.screenTarget.size.x-1 > this.screen.view.position.x + this.screen.view.size.x-1)
				b = (this.currentScene.screenTarget.position.x + this.currentScene.screenTarget.size.x-1) - (this.screen.view.position.x + this.screen.view.size.x-1)
			else
				b = (this.screen.view.position.x + this.screen.view.size.x-1) - (this.currentScene.screenTarget.position.x + this.currentScene.screenTarget.size.x-1)
			
			if(a < b)
				width = a
			else
				width = -b
		}
		if(this.currentScene.screenTarget.position.y < this.screen.view.position.y || this.currentScene.screenTarget.position.y + this.currentScene.screenTarget.size.y-1 > this.screen.view.position.y + this.screen.view.size.y-1){
			if(this.currentScene.screenTarget.position.y > this.screen.view.position.y)
				a = this.currentScene.screenTarget.position.y - this.screen.view.position.y
			else
				a = this.screen.view.position.y - this.currentScene.screenTarget.position.y
			
			if(this.currentScene.screenTarget.position.y + this.currentScene.screenTarget.size.y-1 > this.screen.view.position.y + this.screen.view.size.y-1)
				b = (this.currentScene.screenTarget.position.y + this.currentScene.screenTarget.size.y-1) - (this.screen.view.position.y + this.screen.view.size.y-1)
			else
				b = (this.screen.view.position.y + this.screen.view.size.y-1) - (this.currentScene.screenTarget.position.y + this.currentScene.screenTarget.size.y-1)
			
			if(a < b)
				height = a
			else
				height = -b
        }
		this.moveAllComponents(height, width)
    }
    moveAllComponents(height: number, width: number){
        for(let component of this.currentScene.collection.all)
            if(!component.fixed){
                component.position.x += width
                component.position.y += height
            }
    }
    refreshMovables(){
        for(let component of this.currentScene.collection.movables)
            component.refresh()
    }
    matchEvents(){
        let matchedComponents: {[id: number]: Component[]}
        for(let componentA of this.currentScene.collection.movables){
            matchedComponents = {}
            for(let componentB of this.currentScene.collection.all)
                if(componentA != componentB)
                    for(let tag of componentB.tags)
                        if(componentA.events.expectedTags.includes(tag)){
                            if(!matchedComponents[tag])
                                matchedComponents[tag] = []
                            matchedComponents[tag].push(componentB)
                        }
            componentA.events.fire(matchedComponents)
        }
    }
}