export class SceneLoader extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLoader' });
    }

    preload() {
        // Carrega os spritesheets de MainCharacter
        this.load.spritesheet('idle', 'Assets/MainCharacter/Idle.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('run', 'Assets/MainCharacter/Run.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('jump', 'Assets/MainCharacter/Jump.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        // (Opcional) Indicador de carregamento
        this.add.text(640, 360, 'Carregando...', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);
    }

    create() {
        this.scene.start('Battleground');
    }
}
