import { Player } from '../prefabs/Player.js';
import { Enemy } from '../prefabs/Enemy.js';
import { Projectile } from '../prefabs/Projectile.js';

export class Battleground extends Phaser.Scene {
    constructor() {
        super({ key: 'Battleground' });
    }

    create() {

        this.add.image(640, 360, 'background') 
            .setDisplaySize(1280, 720) 
            .setDepth(-1);  


        //arena de chão
        const ground = this.add.rectangle(640, 710, 1280, 20);
        this.physics.add.existing(ground, true);

        //ativar colisão com bordas do mundo
        this.physics.world.setBoundsCollision(true, true, true, true);

        // Grupos
        //this.projectiles = this.physics.add.group();
        this.projectiles = this.add.group();

        //spawns
        this.player = new Player(this, 640, 500);
        this.enemy = new Enemy(this, 800, 500, this.player);

        //colisão com chão
        this.physics.add.collider(this.player, ground);

    }

    update(time, delta) {
        this.player.update();
    }
}
