import * as PIXI from "pixi.js"
import { Game } from "./game"
import { Ground } from "./ground"
import jump from "url:./sounds/jumpSound.wav"

export class Player extends PIXI.Sprite {
    xspeed = 0
    yspeed = 0
    jumping = false
    game: Game
    ground: Ground
    background: PIXI.Sprite

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.x = 678
        this.y = 200

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

 
    update(delta:number) {
        this.x += this.xspeed
        this.y += this.yspeed

        this.y += this.yspeed

    if (this.y + this.height > 656) {

        this.y = 656 - this.height
        this.yspeed = 0

        this.jumping = false

    } else {
        this.yspeed ++
    }
    }


    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {

            case "A":
                this.xspeed = -15
                break

            case "D":
                this.xspeed = 15
                break

            case "W":
            case " ":
                if (!this.jumping) {
                    this.yspeed -= 15
                    this.height = 44
                    jump.play()
                    
                    this.jumping = true
                }
                break

            case "S":
                this.yspeed += 5
                this.height = 22;
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
           
            case "A":
            case "D":
                this.xspeed = 0
                break

            case "W":
            case " ":
                if (this.jumping) {
                    jump.volume = 1
                    this.height = 44
                }
                break

            case "S":    
                this.yspeed = 0
                this.xspeed = 0
                this.height = 44
                break
        }
    }
}