import { Engine } from "./Engine/Engine";
import { Visible } from "./Engine/Components/Visible";
import { Point } from "./Engine/Screen/references";
import { Color } from "./Engine/utilitys";
import { Player } from "./Engine/Components/Player";
import { Component } from "./Engine/Components/Component";
import { Tag } from "./Engine/Event/TagEvent";
const { deadline, solid } = Tag

export default () => {
    let e = new Engine()
    //camada 0
    let c1 = new Visible(new Point(0,0), new Point(3000,3000), new Color('PaleTurquoise'))
    c1.fixed = true
    //camada 1
    let p1 = new Player(new Point(500,-200), new Point(30,60), new Color('red'), e.currentScene.control),
        l1: Component[] = [
            p1,
            new Component(new Point(-10000,1000), new Point(20000,100)).addTag(deadline),
            new Visible(new Point(1200,600), new Point(40,295), new Color('green')).addTag(solid),
            new Visible(new Point(1500,600), new Point(40,295), new Color('green')).addTag(solid),
            new Visible(new Point(0,200), new Point(300,50), new Color('RoyalBlue')).addTag(solid),
            new Visible(new Point(300,350), new Point(300,50), new Color('Salmon')).addTag(solid),
            new Visible(new Point(-200,400), new Point(300,50), new Color('PaleVioletRed')).addTag(solid),
        ]

    for(let i = -10; i < 10; i += 2)
        l1.push(new Visible(new Point(i * 500,850), new Point(750,0.1*600), new Color('Peru')).addTag(solid))
    for(let i = 1; i < 5; ++i){
        l1.push(new Visible(new Point(0,200 - i*400), new Point(300,50), new Color('RoyalBlue')).addTag(solid))
        l1.push(new Visible(new Point(300,350 - i*400), new Point(300,50), new Color('Salmon')).addTag(solid))
        l1.push(new Visible(new Point(-200,400 - i*400), new Point(300,50), new Color('PaleVioletRed')).addTag(solid))
    }
    
    e.currentScene.collection.addComponent(c1, 0)
    e.currentScene.collection.addComponents(l1, 1)
    e.currentScene.setScreenTarget(p1)
    e.run()

    p1.events.add([deadline],(components: Component[]) => {
        for(let component of components)
            if(p1.collidesWith(component))
                console.log('morreu')
    })
    
}