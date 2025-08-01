import { Player } from '../prefabs/Player.js';
import { Enemy } from '../prefabs/Enemy.js';
import { Projectile } from '../prefabs/Projectile.js';

export class Battleground extends Phaser.Scene {
    constructor() {
        super({ key: 'Battleground' });
    }

    create() {
        this.gameplayMusic = this.sound.add('gameplaymusic', { loop: true, volume: 0.2 });
        this.gameplayMusic.play();

        this.add.image(640, 360, 'background')
            .setDisplaySize(1280, 720)
            .setDepth(-1);

        const ground = this.add.rectangle(640, 710, 1280, 20);
        this.physics.add.existing(ground, true);

        this.physics.world.setBoundsCollision(true, true, true, true);

        this.projectiles = this.add.group();
        this.enemies = this.physics.add.group();

        this.player = new Player(this, 640, 500);
        this.physics.add.collider(this.player, ground);

        this.spawnEvent = this.time.addEvent({
            delay: 3000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => {
            projectile.destroy();
            enemy.takeDamage(1, projectile.x);
        });

        this.lifeLabel = this.add.text(20, 20, 'Life:', {
            fontFamily: 'Courier New',
            fontSize: '60px',
            color: '#FFFFFF'
        }).setOrigin(0, 0);

        this.lifeText = this.add.text(200, 20, this.player.health.toString(), {
            fontFamily: 'Courier New',
            fontSize: '60px',
            color: '#FF0000'
        }).setOrigin(0, 0);

        this.score = 0;
        this.scoreText = this.add.text(640, 20, 'Score: 0', {
            fontFamily: 'Courier New',
            fontSize: '60px',
            color: '#00FF00'
        }).setOrigin(0.5, 0);

        this.isGameOver = false;

    }

   update() {
    if (this.isGameOver) return;

    this.player.update();
    this.lifeText.setText(this.player.health.toString());

    this.enemies.children.iterate(enemy => {
        if (enemy) enemy.update();
    });

    if (this.score > 20) {
        this.spawnEvent.delay = 1000;  
    } else if (this.score > 10) {
        this.spawnEvent.delay = 1500;
    } else if (this.score > 5) {
        this.spawnEvent.delay = 2000;
    } else {
        this.spawnEvent.delay = 3000;
    }

    if (this.player.health <= 0 && !this.isGameOver) {
        this.gameOver();
    }
    }


    spawnEnemy() {
        const side = Phaser.Math.Between(0, 1);

        const x = side === 0 
            ? Phaser.Math.Between(0, 100)     
            : Phaser.Math.Between(1200, 1300); 

        const y = Phaser.Math.Between(300, 600);

        const enemy = new Enemy(this, x, y, this.player);

        enemy.on('death', () => {
            this.score += 1;
            this.scoreText.setText(`Score: ${this.score}`);
        });

        this.enemies.add(enemy);
}


    gameOver() {
        this.isGameOver = true;

        this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.8).setDepth(10);

        this.add.text(640, 250, `Score: ${this.score}`, {
            fontFamily: 'Courier New',
            fontSize: '60px',
            color: '#00FF00'
        }).setOrigin(0.5).setDepth(11);

        this.add.text(640, 360, 'You Dead', {
            fontFamily: 'Courier New',
            fontSize: '48px',
            color: '#FF0000',
            align: 'center'
        }).setOrigin(0.5).setDepth(11);

        this.gameplayMusic.stop();
        this.scene.pause();
    }
}
