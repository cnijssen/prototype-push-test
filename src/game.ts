import * as PIXI from 'pixi.js'
import playerImage from "./images/player.png"
import { Player } from './player'
import { Background } from './background'
import backGroundImage from './images/background.jpg'
import { Ground } from './ground'
import groundImage from "./images/block.png"
import space from "url:./music/spacesong.wav"
import jump from "url:./sounds/jumpSound.wav"



export class Game {
    pixi: PIXI.Application
    bg: PIXI.TilingSprite
    jump = HTMLAudioElement
    player: Player;
    ground: Ground
    private elements: ( Player)[] = []


   
    
    constructor()
    {
        const container = document.getElementById("container")!
        this.pixi = new PIXI.Application({ width: 1400, height: 700 })
        container.appendChild(this.pixi.view)

        this.pixi.loader
        .add("background", backGroundImage)
        .add("player", playerImage)
        .add("ground", groundImage)
        .add("jumpSound", jump)



    this.pixi.loader.load(() => this.doneLoading())

    }

    doneLoading() {
        this.bg = new Background(this.pixi.loader.resources["background"].texture!, 5000, 900)
        this.pixi.stage.addChild(this.bg)

        this.player = new Player(this.pixi.loader.resources["player"].texture!, this)
        this.pixi.stage.addChild(this.player)
        this.elements.push(this.player)

        let ground = new Ground(this.pixi.loader.resources["ground"].texture!)
        this.pixi.stage.addChild(ground)

        this.pixi.ticker.add((delta:number) => this.player.update(delta))

    }

    update(delta:number){
        for (let el of this.elements) {

            el.update(delta)
        }
    }
   
}
new Game()

let gameMusic = new Audio(space)
gameMusic.play()
gameMusic.volume = 0.5
gameMusic.loop = true