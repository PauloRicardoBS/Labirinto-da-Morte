import Enemies from "./Enemies.js";

var player, tempo, chefao1, chefao1Vida = 10, chefao2Vida = 20, chefao3Vida = 30, bala, bala1, shoot, graphics, cursors, collider, camera, enemies, 
    playerPodeAtirar = 1, textTela, tiro = 1000, tileset, groud, groud2, 
    map, vidaGroup, maxVidas = 10, atualVidas = 4, enter, butao, texto, Nerudo;

var Menu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Menu(){
            Phaser.Scene.call(this, {key: ''});
        },
    
    preload(){
        this.load.image('menuPlay', 'img/Menu_back.png');
        this.load.image('butao', 'img/button.png');          
    }, 
    
    create(){
        this.add.image(500, 400, 'menuPlay');
        butao = this.add.image(510, 385, 'butao').setInteractive();
        
        texto = this.add.text(game.config.width / 2, game.config.height / 2, 'Play',
        {fontSize:'40px', fill:"red"
        }).setOrigin(0.5);

        butao.on('pointerdown',() => {
            this.scene.start('Principal');

        });
        enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    },

    update(){
        if(enter.isDown){
            this.scene.start('Principal');
        }
    }
})

var Principal = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
        function Principal(){
            Phaser.Scene.call(this, {key: 'Principal'});
    },

    preload(){

        this.load.image("tiles", "img/cenario.png");
        this.load.image('vida', 'img/coração.png')
        this.load.tilemapTiledJSON("map", "Labirinto da Morte.json");
        this.load.spritesheet('paul', "img/player2.png", {frameWidth: 49, frameHeight: 48});
        this.load.spritesheet('nerudo', 'img/personagens/inimigo.png', {frameWidth: 48, frameHeight: 48});
        this.load.image('chefe1', 'img/personagens/chefão01.png');
        this.load.image('bala', "img/bala.png");
        this.load.image('bola_fogo', "img/bola_fogo.png");
        this.load.image('tigre', "img/tigre_gelo.png");
        this.load.image('deserto', "img/deserto.png");
        this.load.image('fase3', "img/fase3.png");
        this.load.image('ceu', "img/céu estrelado.png");
        this.load.audio('gun', 'sons/gun.wav');
        this.load.audio('pulo', 'sons/pulo.mp3');        
    },

    create(){

        tempo = this.time.addEvent({
            delay: 2000, 
            callback: chefao1Atira,
            loop: true, 
            callbackScope: this});

        //imagens e mapa  
        this.add.image(1602, 576, 'fase3');
        this.add.image(1622, 2650, 'ceu');
        this.add.image(1602, 1617, 'deserto');
    

        map = this.make.tilemap({key : "map"});
        tileset = map.addTilesetImage("cenario", "tiles");
        groud = map.createStaticLayer("groud", tileset, 0, 0);  
    
        //Player e colisões
        this.enemies = map.createFromObjects("inimigo", "inimigo", {});
        this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);
        
        //Vidas no jogo
        
        var vida = this.physics.add.staticImage(2300, 1300, 'vida').refreshBody();
        var vida1 = this.physics.add.staticImage(500, 2000, 'vida').refreshBody();
        var vida2 = this.physics.add.staticImage(3000, 2250, 'vida').refreshBody();
        
        player = this.physics.add.sprite(89, 212, 'paul');
        chefao1 = this.physics.add.staticImage(3000, 2250 , 'chefe1').refreshBody();
        groud2 = map.createStaticLayer("groud2", tileset, 0, 0);
        cursors = this.input.keyboard.createCursorKeys();
        collider = map.createStaticLayer("colisao", tileset, 0, 0);
        collider.setCollisionByProperty({"colisao": true});   
        this.physics.add.collider(player, collider);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(chefao1, collider);
        this.physics.add.collider(player, vida, collectVida, null, this);
        this.physics.add.collider(player, vida1, collectVida, null, this);
        this.physics.add.collider(player, vida2, collectVida, null, this);        

        this.physics.add.collider(player, this.enemiesGroup, deathPlayer, null, this);
        this.physics.add.collider(player, chefao1, morteSubita, null, this);
        this.physics.add.collider(this.enemiesGroup, collider);
        
        // sons
        this.gun = this.sound.add('gun', {loop : false });
        this.pulo = this.sound.add('pulo', { loop : false});
    
        // camera 
        this.cameras.main.setBounds();
        this.physics.world.setBounds();
        this.cameras.main.startFollow(player, true);

        //Movimentações
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('paul', { start: 3, end: 0}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'paul', frame: 4 } ],
            frameRate: 0
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('paul', { start: 6, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'Nerudoleft',
            frames: this.anims.generateFrameNumbers('nerudo', { start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'Nerudoturn',
            frames: [ { key: 'nerudo', frame: 6 } ],
            frameRate: 0
        });
    
        this.anims.create({
            key: 'Nerudoright',
            frames: this.anims.generateFrameNumbers('nerudo', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });  

        this.anims.create({
            key: 'Bolaturn',
            frames: [ { key: 'bola_fogo', frame: 0 } ],
            frameRate: 10
        });

        this.anims.create({
            key: 'Bolaturn',
            frames: [ { key: 'bala', frame: 0 } ],
            frameRate: 10
        });


        //Acompanhando o placar e a tela
        textTela = this.add.text(20, 0,'0', {
            fontFamily: 'Verdana',
            fontSize: '22px',
            backgroundColor: 'rgba(0.3, 0.3, 0.3, 0.3)',
            fill: 'white'
    

        }).setScrollFactor(0);
        
        if (this.cameras.main.deadzone){
            graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);      
        }



        //Colisão para ganhar uma vida

        
        

    },

    update(){


        if (cursors.left.isDown){

            player.setVelocityX(-160);
            player.anims.play('left', true);
        }

        else if (cursors.right.isDown){
            player.setVelocityX(160);
            player.anims.play('right', true);
        }

        else{
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if(cursors.left.isDown && cursors.space.isDown && playerPodeAtirar == 1){ 
            
            bala = this.physics.add.sprite(player.x-37, player.y+3, 'bala');
            bala.setVelocityX(-1800);

            playerPodeAtirar = 0;  
            this.gun.play();          
            tiro = tiro -1;
            if (tiro < 0){
                playerPodeAtirar = 0;
            }
            
            this.physics.add.collider(bala, collider, destroyBala);
            this.physics.add.collider(bala, this.enemiesGroup, deathNerudo, null, this);
            bala.setCollideWorldBounds(true);                  

        }

        if(cursors.right.isDown && cursors.space.isDown && playerPodeAtirar == 1){
            
            bala = this.physics.add.sprite(player.x+39, player.y+5, 'bala');
            bala.setVelocityX(1800);
    
            playerPodeAtirar = 0;
            this.gun.play();
            tiro = tiro -1;
            if (tiro < 0){
                playerPodeAtirar = 0;
            }
                                
            this.physics.add.collider(bala, collider, destroyBala);
            this.physics.add.collider(bala, this.enemiesGroup, deathNerudo, null, this);
            this.physics.add.collider(bala, chefao1, deathChefao1, null, this);
            this.physics.add.collider(bala, bala1, balaChefao1, null, this);
            bala.setCollideWorldBounds(true); 

        }

        if (cursors.up.isDown){
            
            if(player.body.onFloor()){
                this.pulo.play();
                player.body.setVelocityY(-450);
            }
        } 
        
        var cam = this.cameras.main;

        if (cam.deadzone){

            textTela.setText([
            'ScrollX: ' + cam.scrollX,
            'ScrollY: ' + cam.scrollY,
            'MidX: ' + cam.midPoint.x,
            'MidY: ' + cam.midPoint.y,
            'deadzone left: ' + cam.deadzone.left,
            'deadzone right: ' + cam.deadzone.right,
            'deadzone top: ' + cam.deadzone.top,
            'deadzone bottom: ' + cam.deadzone.botto

            ]); 
        } 
        else
        {
            if(chefao1Vida > 0){
                textTela.setText([
                    'Qtd Balas: ' + tiro + '\n' + 'Vidas: ' + atualVidas,
                    'Chefão1: ' + chefao1Vida]);
                } 

            else if(chefao2Vida > 0){
                textTela.setText([
                    'Qtd Balas: ' + tiro + '\n' + 'Vidas: ' + atualVidas,
                    'Chefão2: ' + chefao2Vida]);
                }
            
            else{

                textTela.setText([
                    'Qtd Balas: ' + tiro + '\n' + 'Vidas: ' + atualVidas,
                    'Chefão3: ' + chefao3Vida]);
            }


        }
        

        if(cursors.space.isUp && tiro > 0){
            playerPodeAtirar = 1;
        }

        
    
    }
});

function collectVida(player, vida){

    vida.disableBody(true, true);
    atualVidas = atualVidas + 1;

}

function balaChefao1(bala, bala1){
    
    bala1.setVisible(false);
    bala1.setActive(false);
    bala1.body.enable = false;
    bala.destroy(); 
    
}

function chefao1Atira(){

    bala1 = this.physics.add.sprite(chefao1.x-96, chefao1.y-10, 'tigre');
    bala1.setVelocityX(-200);
    this.physics.add.collider(bala1, collider);
    this.physics.add.collider(bala1, player, deathPlayerChefao1, null, this);
    bala1.setCollideWorldBounds(true); 

}

function morteSubita (player){
    
    player.setTint(0x1E90FF);
    this.physics.pause();
    player.anims.play('turn');  

}

function deathPlayer (player, enemiesGroup){

    enemiesGroup.setVisible(false);
    enemiesGroup.setActive(false);
    enemiesGroup.body.enable = false;
    atualVidas = atualVidas - 1;    

    if (atualVidas == 0){
        
        player.setTint(0xff0000);
        this.physics.pause();
        player.anims.play('turn');
    }
}

function deathChefao1(bala, chefao1){
  
    chefao1Vida = chefao1Vida - 1;
    bala.destroy();
    
                            
    if (chefao1Vida == 0){

        chefao1.setVisible(false);
        chefao1.setActive(false);
        chefao1.body.enable = false;
        tempo.remove(false);
        chefao1.destroy();
    }
    
    
}

function deathPlayerChefao1 (bala1, player){

    atualVidas = atualVidas - 1; 
    bala1.setVisible(false);
    bala1.setActive(false);
    bala1.body.enable = false;

    if (atualVidas == 0){
        
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');

    }  

}

function deathNerudo(bala, enemiesGroup){
    
    enemiesGroup.setVisible(false);
    enemiesGroup.setActive(false);
    enemiesGroup.body.enable = false;
    bala.destroy(); 
    
}

function destroyBala(bala){

    bala.destroy();

}

const config = {

    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene:[Menu,Principal],

    audio: {
        disableWebAudio: true
    }
};
var game = new Phaser.Game(config);
