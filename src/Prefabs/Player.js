export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setBounce(0.1);
        this.setCollideWorldBounds(true);

        //adjust hitbox
        this.body.setSize(35, 80);
        this.body.setOffset(40, 48);

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
            frames: scene.anims.generateFrameNumbers('run', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('jump', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: 0 
        });
    }

    update() {
    const onGround = this.body.blocked.down || this.body.touching.down;

    // Movimento horizontal e animações
    if (this.cursors.left.isDown) {
        this.setVelocityX(-200);
        if (onGround) this.anims.play('run', true);
        this.setFlipX(true);

    } else if (this.cursors.right.isDown) {
        this.setVelocityX(200);
        if (onGround) this.anims.play('run', true);
        this.setFlipX(false);

    } else {
        this.setVelocityX(0);
        if (onGround) this.anims.play('idle', true);
    }

    // Pulo
    if (this.cursors.up.isDown && onGround) {
        this.setVelocityY(-330);
        this.anims.play('jump', true);
    }

    // Ajuste de hitbox dinâmico com base no flip
    if (this.flipX) {
        this.body.setOffset(55, 48); // Quando virado para a esquerda
    } else {
        this.body.setOffset(38, 48); // Quando virado para a direita
    }
}

}