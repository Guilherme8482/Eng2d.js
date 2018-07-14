import { Point } from "../Screen/references";
import { Color } from "../utilitys";
import { Visible } from "./Visible";

export class Fixed  extends Visible{
    constructor(position: Point, size: Point, color: Color){
        super(position, size, color)
    }
}