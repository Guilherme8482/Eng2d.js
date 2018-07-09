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
    let c2 = new Player(new Point(500,-200), new Point(30,60), new Color('red'), e.currentScene.control),
        c3 = new Component(new Point(-10000,1000), new Point(20000,100)).addTag(deadline),
        c4 = new Visible(new Point(1200,600), new Point(40,295), new Color('green')).addTag(solid),
        c5 = new Visible(new Point(1500,600), new Point(40,295), new Color('green')).addTag(solid),
        c6 = new Visible(new Point(0,200), new Point(300,50), new Color('RoyalBlue')).addTag(solid),
        c7 = new Visible(new Point(300,350), new Point(300,50), new Color('Salmon')).addTag(solid),
        c8 = new Visible(new Point(-200,400), new Point(300,50), new Color('PaleVioletRed')).addTag(solid),
        cs: Component[] = []
    for(let i = -10; i < 10; i += 2)
        cs.push(new Visible(new Point(i * 500,850), new Point(750,0.1*600), new Color('Peru')).addTag(solid))
    for(let i = 1; i < 5; ++i){
        cs.push(new Visible(new Point(0,200 - i*400), new Point(300,50), new Color('RoyalBlue')).addTag(solid))
        cs.push(new Visible(new Point(300,350 - i*400), new Point(300,50), new Color('Salmon')).addTag(solid))
        cs.push(new Visible(new Point(-200,400 - i*400), new Point(300,50), new Color('PaleVioletRed')).addTag(solid))
    }
    
    e.currentScene.collection.addComponent(c1, 0)
    e.currentScene.collection.addComponents([c2, c3, c4, c5, c6, c7, c8, ...cs], 1)
    e.currentScene.setScreenTarget(c2)
    e.run()
}