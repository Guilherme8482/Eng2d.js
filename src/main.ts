import { Engine } from "./Engine/Engine";
import { Visible } from "./Engine/Components/Visible";
import { Point } from "./Engine/Screen/references";
import { Color } from "./Engine/utilitys";
import { Component } from "./Engine/Components/Component";
import { Tag } from "./Engine/Event/TagEvent";
import { Shooter } from "./Engine/Components/Players/Shooter";
import { Fixed } from "./Engine/Components/Fixed";
import { Panel } from "./Engine/Components/Panel/Panel";
import { Item } from "./Engine/Components/Item/Item";
const { deadline, solid, player, item } = Tag

//export default () => {
    let e = new Engine()
    //Scene 1#
    let l1 = [new Fixed(new Point(0,0), new Point(3000,3000), new Color('PaleTurquoise'))]
    let p1 = new Shooter(new Point(500,-200), new Point(30,60), new Color('red'), e, 1),
        l2: Component[] = [
            p1.addTags([player]),
            new Component(new Point(-10000,1000), new Point(20000,100)).addTag(deadline),
            new Visible(new Point(1200,600), new Point(40,295), new Color('green')).addTag(solid),
            new Visible(new Point(1500,600), new Point(40,295), new Color('green')).addTag(solid),
            new Visible(new Point(0,200), new Point(300,50), new Color('RoyalBlue')).addTag(solid),
            new Visible(new Point(300,350), new Point(300,50), new Color('Salmon')).addTag(solid),
            new Visible(new Point(-200,400), new Point(300,50), new Color('PaleVioletRed')).addTag(solid),
        ]
    for(let i = -10; i < 10; i += 2)
        l2.push(new Visible(new Point(i * 500,850), new Point(750,0.1*600), new Color('Peru')).addTag(solid))
    for(let i = 1; i < 5; ++i){
        l2.push(new Visible(new Point(0,200 - i*400), new Point(300,50), new Color('RoyalBlue')).addTag(solid))
        l2.push(new Visible(new Point(300,350 - i*400), new Point(300,50), new Color('Salmon')).addTag(solid))
        l2.push(new Visible(new Point(-200,400 - i*400), new Point(300,50), new Color('PaleVioletRed')).addTag(solid))
    }
    for(let i = 4; i < 30; i += 2){
        l2.push(new Item(new Point((i - 1) * 200, 200), new Point(40, 40), 0.2).addTag(item))
        l2.push(new Item(new Point(i * 200, 400), new Point(40, 40), 0.2).addTag(item))
    }
    let l3: Component[] = [
        new Panel(new Point(50, 50), new Point(20,20), () => `Pulos: ${p1.jumpStatus.current}`),
        new Panel(new Point(250, 50), new Point(20,20), () => `Municao: ${p1.weapon.bulletsLoaded}`),
        new Panel(new Point(450, 50), new Point(20,20), () => `Itens: ${p1.backpack.items.length}`)
    ]
    e.currentScene.collection.addComponents(l1, 0)
    e.currentScene.collection.addComponents(l2, 1)
    e.currentScene.collection.addComponents(l3, 2)
    e.currentScene.setScreenTarget(p1)
    //Scene 2#
    e.createScene('GameOver')
    e.setCurrentScene('GameOver')
    let s2: Component[] = [
        new Fixed(new Point(0,0), new Point(3000,3000), new Color('pink')),
        new Visible(new Point(200,200), new Point(500,100), new Color('white'))
    ]
    e.currentScene.collection.addComponents(s2,0)
    //--------------
    e.setCurrentScene('default')
    e.run()
    p1.events.add([deadline],(components: Component[]) => {
        for(let component of components)
            if(p1.collidesWith(component))
                e.setCurrentScene('GameOver')
    })
//}