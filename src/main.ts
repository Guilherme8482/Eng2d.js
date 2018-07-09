import { Visible } from "./Engine/Components/Visible";
import { Point } from "./Engine/Screen/references";
import { Color } from "./Engine/utilitys";
import { Solid } from "./Engine/Components/Solid";
import { Engine } from "./Engine/Engine";
import { Tag } from "./Engine/Event/TagEvent";
import { Player } from "./Engine/Components/Player";
const { solid } = Tag

let e = new Engine(),
    bg = new Visible(new Point(0,0), new Point(3000,3000), new Color('PaleTurquoise')),
    v2 = new Visible(new Point(200,500), new Point(300,50), new Color('blue')),
    v3 = new Visible(new Point(500,500), new Point(300,50), new Color('green')),
    m1 = new Player(new Point(300,0), new Point(50, 100), new Color('red'), e.currentScene.control)


v2.tags.push(solid)
v3.tags.push(solid)

e.currentScene.setScreenTarget(m1)
e.currentScene.collection.addComponents([v2, v3, m1], 1)
e.currentScene.collection.addComponent(bg, 0)
e.run()
console.log(e)


