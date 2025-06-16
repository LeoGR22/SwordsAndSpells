export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('menu', 'assets/Background/Menu.png');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.add.image(640, 360, 'menu')
            .setDisplaySize(1280, 720)
            .setDepth(-1);

        this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.6)
            .setDepth(0);

        this.add.text(640, 300, 'Jogo', {
            fontFamily: 'Courier New',
            fontSize: '92px',
            color: '#FFA500'
        }).setOrigin(0.5);

        const pressEnter = this.add.text(640, 380, 'Press Enter to play', {
            fontFamily: 'Courier New',
            fontSize: '44px',
            color: '#FFA500'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: pressEnter,
            alpha: { from: 1, to: 0 },
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const instructions = this.add.text(20, 700, 
            'WASD to move\nJ to MeleeAttack\nK to projectile', {
            fontFamily: 'Courier New',
            fontSize: '30px',
            color: '#FFA500',
            align: 'left',
        }).setOrigin(0, 1);

        const creditsText = this.add.text(1250, 700, 'Leonardo Gabriel Rendaki\nFreddy Matheus Gonçalves\nDavi Henrique Moreira\nFellipe Luiz Serpe Barros', {
            fontFamily: 'Courier New',
            fontSize: '34px',
            color: '#E0E0E0',
            align: 'right'
        }).setOrigin(1, 1);

        this.tweens.add({
            targets: creditsText,
            y: creditsText.y - 10,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('SceneLoader', 'Battleground');
            });
        });
    }
}
