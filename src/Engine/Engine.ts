
import { Component } from './Components/Component';
import { Scene } from './Scene';
import { Screen } from './Screen/screen'

export const refreshTime = 1000 / 144

export class Engine{
    public screen = new Screen()
    public currentScene: Scene
    public scenes: {[id: string]: Scene} = {}

    constructor(){
        this.currentScene = new Scene(this.screen.canvas)
        this.scenes['default'] = this.currentScene
    }
    run(){
        this.proccesGame()
        this.renderScreen()
    }
    proccesGame(){
        setTimeout(this.proccesGame.bind(this), refreshTime)
        this.currentScene.control.pressed.fireActions()
        this.adjustView()
        this.matchEvents()
        this.refreshMovables()
        this.matchEvents()
    }
    renderScreen(){
        window.requestAnimationFrame(this.renderScreen.bind(this))
        this.renderComponents()
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
    createScene(name: string): Scene{
        if(this.scenes[name])
            throw new Error('This name has already been used.')
        return this.scenes[name] = new Scene(this.screen.canvas)
    }
    setCurrentScene(name: string){
        this.currentScene = this.scenes[name]
    }
}