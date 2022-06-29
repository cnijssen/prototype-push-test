import * as PIXI from 'pixi.js'
import { Game } from "./game"

export class Ground extends PIXI.Sprite {
    game: Game

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.anchor.set(0)
        this.x = 0
        this.y = 656
        this.width = 1400
    }
}