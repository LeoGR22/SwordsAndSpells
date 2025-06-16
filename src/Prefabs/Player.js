import { Projectile } from './Projectile.js';

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setCollideWorldBounds(true);

        this.body.setSize(35, 80);
        this.body.setOffset(40, 48);

        this.health = 3;
        this.isInvulnerable = false;
        this.isKnockedBack = false;
        this.isAttacking = false;
        this.projectileFired = false; // flag para evitar múltiplos disparos

        this.createAnimations(scene);

        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.attack1Key = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.attack2Key = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('idle', { start: 0, end: 7 }),
            frameRate: 6,
            repeat: -1
        });

        scene.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNumbers('run', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
        });

        scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('walk', { start: 0, end: 6 }),
            frameRate: 12,
            repeat: -1
        });

        scene.anims.create({
            key: 'attack1',
            frames: scene.anims.generateFrameNumbers('attack1', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: 0
        });

        // Animação do ataque2 com evento no frame 7
        scene.anims.create({
            key: 'attack2',
            frames: scene.anims.generateFrameNumbers('attack2', { start: 0, end: 8 }),
            frameRate: 12,
            repeat: 0
        });

         scene.anims.create({
            key: 'hurt',
            frames: scene.anims.generateFrameNumbers('hurt', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: 0
        });

        //dispara projétil no frame 7
        scene.events.on('update', () => {
            if (this.anims.currentAnim?.key === 'attack2' && this.anims.currentFrame?.index === 7 && !this.projectileFired) {
                const direction = this.flipX ? -1 : 1;
                const projectile = new Projectile(this.scene, this.x + (direction * 50), this.y + 35, direction);
                this.scene.projectiles.add(projectile);

                this.scene.physics.add.overlap(projectile, this.scene.enemy, (proj, enemy) => {
                    if (enemy.isAlive) {
                        enemy.takeDamage(1, proj.x);
                        proj.destroy();
                    }
                });

                this.projectileFired = true;
            }

            //resetar flag ao fim da animação
            if (this.anims.currentAnim?.key !== 'attack2') {
                this.projectileFired = false;
            }
        });
    }

    takeDamage(amount, sourceX) {
        if (this.isKnockedBack || this.isInvulnerable) return;

        this.health -= amount;
        console.log(`Player tomou dano! Vida restante: ${this.health}`);

        this.isKnockedBack = true;
        this.isInvulnerable = true;
        this.isAttacking = false;

        this.setTint(0xff0000);
        this.anims.play('hurt', true);

        const knockbackDirection = this.x < sourceX ? -1 : 1;
        this.setVelocity(knockbackDirection * 300, 0);

        this.scene.time.delayedCall(500, () => {
            this.isKnockedBack = false;
            this.setVelocity(0, 0);
        });

        this.scene.time.delayedCall(1000, () => {
            this.isInvulnerable = false;
            this.clearTint();
        });

        this.scene.time.delayedCall(1500, () => {
            this.isKnockedBack = false;
            this.isInvulnerable = false;
            this.clearTint();
        });

        if (this.health <= 0) this.die();
    }

    die() {
        this.setVelocity(0, 0);
        this.anims.stop();
        console.log("Player morreu!");
    }

    update() {
        const speed = 250;

        if (this.isAttacking || this.isKnockedBack) return;

        // Movimento horizontal
        if (this.keyA.isDown) {
            this.setVelocityX(-speed);
            this.setFlipX(true);
        } else if (this.keyD.isDown) {
            this.setVelocityX(speed);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }

        // Movimento vertical
        if (this.keyW.isDown && this.y > 280) {
            this.setVelocityY(-speed);
        } else if (this.keyS.isDown && this.y < 650) {
            this.setVelocityY(speed);
        } else {
            this.setVelocityY(0);
        }


        // Ataque 1
        if (Phaser.Input.Keyboard.JustDown(this.attack1Key)) {
            this.setVelocity(0, 0);
            this.anims.play('attack1');
            this.isAttacking = true;

            this.once('animationcomplete-attack1', () => {
                this.isAttacking = false;

                // Percorre todos os inimigos no grupo
                this.scene.enemies.children.iterate(enemy => {
                    if (!enemy || !enemy.isAlive) return;

                    const distance = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
                    const isInFront = this.flipX ? enemy.x < this.x : enemy.x > this.x;

                    if (distance < 120 && isInFront) {
                        enemy.takeDamage(1, this.x);
                    }
                });
            });

            return;
        }

        //ataque 2 com projétil
        if (Phaser.Input.Keyboard.JustDown(this.attack2Key)) {
            this.setVelocity(0, 0);
            this.anims.play('attack2');
            this.isAttacking = true;

            this.once('animationcomplete-attack2', () => {
                this.isAttacking = false;
                this.projectileFired = false;
            });

            return;
        }

        //animações de movimento
        if (this.body.velocity.x !== 0) {
            this.anims.play('run', true);
        } else if (this.body.velocity.y !== 0) {
            this.anims.play('walk', true);
        } else {
            this.anims.play('idle', true);
        }

        //ajuste da hitbox com base na direção
        if (this.flipX) {
            this.body.setOffset(55, 48);
        } else {
            this.body.setOffset(38, 48);
        }
    }
}
