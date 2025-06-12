import { Player } from '../prefabs/Player.js';

export class Battleground extends Phaser.Scene {
    constructor() {
        super({ key: 'Battleground' });
    }

    create() {
        // Cria o chão: um retângulo verde na parte inferior
        const ground = this.add.rectangle(640, 700, 1280, 40, 0x00ff00);
        this.physics.add.existing(ground, true); // corpo estático (true)

        // Instancia o player no meio da tela (x=640, y=100)
        this.player = new Player(this, 640, 100);

        // Configura colisão entre player e chão
        this.physics.add.collider(this.player, ground);
    }

    update() {
        // Atualiza o player (movimento, animações, controles)
        this.player.update();
    }
}
