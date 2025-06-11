export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setBounce(0.1);
        this.setCollideWorldBounds(true);

        //adjust hitbox
        this.body.setSize(30, 32);
        this.body.setOffset(32.5, 50);

        // Criação das animações
        this.createAnimations(scene);

        // Controles
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('idle', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNumbers('run', { start: 0, end: 15 }),
            frameRate: 15,
            repeat: -1
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play('run', true);
            this.setFlipX(true);

        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play('run', true);
            this.setFlipX(false);

        } else {
            this.setVelocityX(0);
            this.anims.play('idle', true);
        }


        if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-330);
        }
    }
}