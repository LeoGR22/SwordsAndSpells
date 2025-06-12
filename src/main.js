import { Start } from './scenes/Start.js';
import { SceneLoader } from './scenes/SceneLoader.js';
import {Battleground} from './scenes/Battleground.js'

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [
        //Start,
        SceneLoader,
        Battleground
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 700},
            debug: true
        }
    }
}

new Phaser.Game(config);
            