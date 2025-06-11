import { Player } from '../prefabs/Player.js';

export class Plataformer extends Phaser.Scene {
    constructor() {
        super({ key: 'Plataformer' });
    }

    preload() {
        this.load.spritesheet('idle', 'assets/samurai/IDLE.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('run', 'assets/samurai/RUN.png', { frameWidth: 96, frameHeight: 96 });
    }

    create() {
        this.player = new Player(this, 640, 100);

        const ground = this.add.rectangle(640, 700, 1280, 40, 0x00ff00);
        this.physics.add.existing(ground, true);
        this.physics.add.collider(this.player, ground);
    }

    update() {
        this.player.update();
    }
}