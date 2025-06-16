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

        // Arena de chão
        const ground = this.add.rectangle(640, 710, 1280, 20);
        this.physics.add.existing(ground, true);

        // Ativar colisão com bordas do mundo
        this.physics.world.setBoundsCollision(true, true, true, true);

        // Grupos
        this.projectiles = this.add.group();

        // Spawns iniciais
        this.player = new Player(this, 640, 500);
        
        // Colisão com o chão
        this.physics.add.collider(this.player, ground);

        // ===== SPAWN DE INIMIGOS =====
        this.enemies = this.physics.add.group();

        this.time.addEvent({
            delay: 3000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // Colisão entre projéteis e inimigos
        this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => {
            projectile.destroy();
            enemy.takeDamage(1, projectile.x);
        });
    }

    update(time, delta) {
        this.player.update();

        this.enemies.children.iterate(enemy => {
            if (enemy) enemy.update();
        });
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(100, 1200);
        const y = Phaser.Math.Between(100, 500);
        const enemy = new Enemy(this, x, y, this.player);
        this.enemies.add(enemy);
    }
}
