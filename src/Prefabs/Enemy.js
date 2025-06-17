export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, 'enemy_idle');

        this.scene = scene;
        this.player = player;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setScale(2);
        this.body.setSize(35, 80);
        this.body.setOffset(40, 48);

        this.speed = 100;
        this.attackRange = 50;
        this.isAttacking = false;
        this.isStunned = false;
        this.isInvulnerable = false;

        this.health = 2;
        this.isAlive = true;

        this.createAnimations(scene);
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'enemy_idle',
            frames: scene.anims.generateFrameNumbers('enemy_idle', { start: 0, end: 6 }),
            frameRate: 6,
            repeat: -1
        });

        scene.anims.create({
            key: 'enemy_run',
            frames: scene.anims.generateFrameNumbers('enemy_run', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'enemy_attack',
            frames: scene.anims.generateFrameNumbers('enemy_attack', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        scene.anims.create({
            key: 'enemy_hurt',
            frames: scene.anims.generateFrameNumbers('enemy_hurt', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'enemy_dead',
            frames: scene.anims.generateFrameNumbers('enemy_dead', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.isAlive) this.updateAI();
    }

    updateAI() {
        if (!this.player || this.isAttacking || this.isStunned) return;

        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        if (distance > this.attackRange) {
            this.scene.physics.moveToObject(this, this.player, this.speed);
            this.anims.play('enemy_run', true);
        } else {
            this.setVelocity(0, 0);
            this.attack();
        }

        this.setFlipX(this.x > this.player.x);
    }

    attack() {
        if (this.isAttacking || this.isStunned) return;

        this.isAttacking = true;
        this.setVelocity(0, 0);
        this.anims.play('enemy_attack', true);

        this.once('animationcomplete-enemy_attack', () => {
            // Aplica dano no fim da animação
            const distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
            if (distance <= this.attackRange + 10) {
                this.player.takeDamage(1, this.x);
            }

            this.isStunned = true;
            this.anims.play('enemy_idle', true);

            this.scene.time.delayedCall(1000, () => {
                this.isStunned = false;
                this.isAttacking = false;
            });
        });
    }

    takeDamage(amount, sourceX) {
        if (!this.isAlive || this.isInvulnerable) return;

        this.health -= amount;
        this.isStunned = true;
        this.isAttacking = false;
        this.isInvulnerable = true;

        this.removeAllListeners('animationcomplete-enemy_attack');
        this.setVelocity(0, 0);
        this.anims.play('enemy_hurt', true);
        this.setTint(0xff0000);

        const knockbackForce = 200;
        const direction = this.x < sourceX ? -1 : 1;
        this.setVelocity(knockbackForce * direction, -knockbackForce / 2);

        // Após 500ms, volta ao idle e pode ser atingido novamente
        this.scene.time.delayedCall(500, () => {
            if (this.health > 0) {
                this.clearTint();
                this.isStunned = false;
                this.anims.play('enemy_idle', true);
            }
        });

        // Invulnerabilidade temporária (400ms)
        this.scene.time.delayedCall(400, () => {
            this.isInvulnerable = false;
        });

        // Morte
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
         this.emit('death');
        this.isAlive = false;
        this.setVelocity(0, 0);
        this.anims.play('enemy_dead');
        this.once('animationcomplete-enemy_dead', () => {
            this.destroy();
        });
    }
}
