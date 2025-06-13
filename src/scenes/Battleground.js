import { Player } from '../prefabs/Player.js';
import { Enemy } from '../prefabs/Enemy.js';
import { Projectile } from '../prefabs/Projectile.js';

export class Battleground extends Phaser.Scene {
    constructor() {
        super({ key: 'Battleground' });
    }

    create() {
        // Arena de chão
        const ground = this.add.rectangle(640, 710, 1280, 20, 0x00ff00);
        this.physics.add.existing(ground, true);

        // Ativar colisão com bordas do mundo
        this.physics.world.setBoundsCollision(true, true, true, true);

        // Grupos
        this.projectiles = this.physics.add.group();

        // Entidades
        this.player = new Player(this, 640, 500);
        this.enemy = new Enemy(this, 800, 500, this.player);

        // Colisão com chão
        this.physics.add.collider(this.player, ground);

    }

    update() {
        this.player.update();
    }
}
