export class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'projectile');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setSize(35, 25);      
        this.body.setOffset(10, 50);

        this.setScale(2);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.setAllowGravity(false);
        this.body.moves = true;

        const speed = 500;
        const velocity = direction < 0 ? -speed : speed;
        this.body.setVelocityX(velocity);

        if (!scene.anims.exists('projectile_fly')) {
            scene.anims.create({
                key: 'projectile_fly',
                frames: scene.anims.generateFrameNumbers('projectile', { start: 0, end: 5 }),
                frameRate: 12,
                repeat: -1
            });
        }

        this.anims.play('projectile_fly', true);
        this.setFlipX(direction < 0);

        this.body.world.on('worldbounds', (body) => {
            if (body.gameObject === this) {
                this.destroy();
            }
        });
    }
}
