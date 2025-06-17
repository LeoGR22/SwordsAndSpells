export class SceneLoader extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLoader' });
    }

    preload() {

        this.load.image('background', 'Assets/Background/Bg.png');
        this.load.audio('gameplaymusic', 'Assets/Sounds/Musics/gameplaymusic.mp3')

        //////////////////////////////////////////////
        // Carrega os spritesheets de MainCharacter
        this.load.spritesheet('idle', 'Assets/MainCharacter/Idle.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('run', 'Assets/MainCharacter/Run.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('walk', 'Assets/MainCharacter/Walk.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('attack1', 'Assets/MainCharacter/Attack_1.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('attack2', 'Assets/MainCharacter/Attack_2.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('projectile', 'Assets/MainCharacter/Charge_2.png', {
            frameWidth: 64,
            frameHeight: 128
        });        

        this.load.spritesheet('hurt', 'Assets/MainCharacter/Hurt.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        ////////////////////////////////////////////////



        /////////////////////////////////////////////////
        //Carrega os sprites dos inimigos
        this.load.spritesheet('enemy_idle', 'Assets/Enemy1/Idle.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        
       this.load.spritesheet('enemy_run', 'Assets/Enemy1/Run.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('enemy_attack', 'Assets/Enemy1/Attack_1.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('enemy_hurt', 'Assets/Enemy1/Hurt.png', {
            frameWidth: 128,
            frameHeight: 128
        });

        this.load.spritesheet('enemy_dead', 'Assets/Enemy1/Dead.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        ///////////////////////////////////////////////////////


        this.add.text(640, 360, 'Carregando...', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);
    }

    create() {
        this.scene.start('Battleground');
    }
}
