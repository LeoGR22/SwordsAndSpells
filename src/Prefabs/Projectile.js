export class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'projectile');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1.5);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        this.direction = direction;
        this.speed = 400;
        this.setVelocityX(this.speed * this.direction);

        scene.anims.create({
            key: 'projectile_fly',
            frames: scene.anims.generateFrameNumbers('projectile', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: 0
        });
        

        // Toca animação e ajusta direção
        this.anims.play('projectile_fly', true);
        this.setFlipX(direction < 0);

        // Destroi quando sair do mundo
        this.body.world.on('worldbounds', (body) => {
            if (body.gameObject === this) {
                this.destroy();
            }
        });
    }
}
