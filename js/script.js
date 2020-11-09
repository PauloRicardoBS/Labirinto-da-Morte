import Enemies from "./Enemies.js";
import Chefaos2 from "./Chefaos2.js";

var player, golem, score = 0, tempo, fogoCanhao, chefao1, barreira, chefao1Vida = 10, chefao2Vida = 20, chefao3Vida = 30, 
    bala, bala1, graphics, cursors, collider, camera, playerPodeAtirar = 1, textTela, tiro = 35, 
    tileset, groud, groud2, map, atualVidas = 5, enter, botaoPlay, botaoDescricao, botaoVoltar, texto, Nerudo;

var Menu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Menu(){
            Phaser.Scene.call(this, {key: 'Menu'});
        },
    
    preload(){
        this.load.image('menuPlay', 'img/Menu_back.png');
        this.load.image('botao', 'img/button.png');          
    }, 
    
    create(){
        this.add.image(500, 400, 'menuPlay');
        botaoPlay = this.add.image(510, 385, 'botao').setInteractive();
        botaoDescricao = this.add.image(510, 500, 'botao').setInteractive();
        
        texto = this.add.text(game.config.width /2, game.config.height / 2, 'PLAY',
        {fontSize:'40px', fill:"red"
        }).setOrigin(0.5);

        texto = this.add.text(game.config.width / 2.01, game.config.height / 1.55, 'Regras',
        {fontSize:'40px', fill:"white"
        }).setOrigin(0.5);

        botaoPlay.on('pointerdown',() => {
            this.scene.start('Principal');

        });

        botaoDescricao.on('pointerdown',() => {
            this.scene.start('Regras');

        });

        enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    },

    update(){
        if(enter.isDown){
            this.scene.start('Principal');
        }
    }
})

var Regras = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Regras(){
            Phaser.Scene.call(this, {key: 'Regras'});
        },
    
    preload(){
        this.load.image('regras', 'img/regras.png');    
    }, 
    
    create(){

        this.add.image(500, 400, 'regras');
        botaoVoltar = this.add.image(910, 645, 'botao').setInteractive();

        texto = this.add.text(game.config.width /1.12, game.config.height /1.19, 'Voltar',
        {fontSize:'40px', fill:"red"
        }).setOrigin(0.5);

        botaoVoltar.on('pointerdown',() => {
            this.scene.start('Menu');
        });         
    },

    update(){
        
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
        this.load.spritesheet('inimigo', 'img/personagens/inimigo.png', {frameWidth: 48, frameHeight: 48});
        this.load.spritesheet('golem', 'img/golem_pedra.png', {frameWidth: 98, frameHeight: 98});
        this.load.image('chefe1', 'img/personagens/chefão01.png');
        this.load.spritesheet('fogoCanhao', 'img/fogo_canhao.png',{frameWidth: 49, frameHeight: 48});
        this.load.image('barreira', 'img/barreira.png');
        this.load.image('bala', "img/bala.png");
        this.load.image('bola_fogo', "img/bola_fogo.png");
        this.load.spritesheet('pedra', "img/pedra.png",{frameWidth: 49, frameHeight: 48});
        this.load.image('tigre', "img/bala_chefao1.png");
        this.load.image('deserto', "img/deserto.png");
        this.load.image('fase3', "img/fase3.png");
        this.load.image('cartucho', "img/cartucho.png");        
        this.load.image('ceu', "img/céu estrelado.png");
        this.load.audio('gun', 'sons/gun.wav');
        this.load.audio('pulo', 'sons/pulo.mp3'); 
        this.load.audio('somChefao1', 'sons/som_chefao1.mp3');
        this.load.audio('pegarObjetos', 'sons/pegar_objetos.mp3'); 
        this.load.audio('explosaoChefao1', 'sons/explosao_chefao1.mp3'); 
               
    },

    create(){

        tempo = this.time.addEvent({
            delay: 3000, 
            callback: chefao1Atira,
            loop: true, 
            callbackScope: this,
            hasDispatched : true});

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
        this.chefaos2 = map.createFromObjects("chefao2", "chefao2", {});
        this.chefaos2Group = new Chefaos2(this.physics.world, this, [], this.chefaos2);
        
        //Vidas no jogo
        var vida0 = this.physics.add.staticImage(2300, 1300,  'vida').refreshBody();
        var vida1 = this.physics.add.staticImage(500, 2000,  'vida').refreshBody();
        var vida2 = this.physics.add.staticImage(3000, 2250, 'vida').refreshBody();
        var vida3 = this.physics.add.staticImage(77, 851,    'vida').refreshBody();
        var vida4 = this.physics.add.staticImage(2129, 1230, 'vida').refreshBody();
        var vida5 = this.physics.add.staticImage(3010, 106,  'vida').refreshBody();
        var vida6 = this.physics.add.staticImage(151, 2927,  'vida').refreshBody();
        var vida7 = this.physics.add.staticImage(2562, 2524,  'vida').refreshBody();

        //Cartuchos de balas
        var cartucho1 = this.physics.add.staticImage(1807, 894,  'cartucho').refreshBody();
        var cartucho2 = this.physics.add.staticImage(2070, 264,  'cartucho').refreshBody();
        var cartucho3 = this.physics.add.staticImage(78, 2915,   'cartucho').refreshBody();
        var cartucho4 = this.physics.add.staticImage(1106, 2893, 'cartucho').refreshBody();
        var cartucho5 = this.physics.add.staticImage(924, 2333,  'cartucho').refreshBody();
        var cartucho6 = this.physics.add.staticImage(2290, 2272, 'cartucho').refreshBody();
        var cartucho7 = this.physics.add.staticImage(2744, 1989,  'cartucho').refreshBody();
        var cartucho8 = this.physics.add.staticImage(1959, 1532,  'cartucho').refreshBody();
        var cartucho9 = this.physics.add.staticImage(2814, 1356,  'cartucho').refreshBody();
        var cartucho10 = this.physics.add.staticImage(2399, 1226,  'cartucho').refreshBody();
        var cartucho11 = this.physics.add.staticImage(1383, 227,  'cartucho').refreshBody();
        var cartucho12 = this.physics.add.staticImage(2707, 106,  'cartucho').refreshBody();
        var cartucho13 = this.physics.add.staticImage(1608, 495,  'cartucho').refreshBody();
        var cartucho14 = this.physics.add.staticImage(1873, 906,  'cartucho').refreshBody();
        var cartucho15 = this.physics.add.staticImage(2649, 1195,  'cartucho').refreshBody();
        var cartucho16 = this.physics.add.staticImage(2860, 1060,  'cartucho').refreshBody();
        var cartucho17 = this.physics.add.staticImage(2910, 2558,  'cartucho').refreshBody();
        
        player = this.physics.add.sprite(1089, 1196, 'paul');
        chefao1 = this.physics.add.staticImage(3000, 2256 , 'chefe1').refreshBody();
        fogoCanhao = this.physics.add.sprite(2950, 2256, 'fogoCanhao');
        barreira = this.physics.add.staticImage(1990, 2276, 'barreira').refreshBody();
        groud2 = map.createStaticLayer("groud2", tileset, 0, 0);
        cursors = this.input.keyboard.createCursorKeys();
        collider = map.createStaticLayer("colisao", tileset, 0, 0);
        collider.setCollisionByProperty({"colisao": true});         
        this.physics.add.collider(player, collider);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(chefao1, collider);
        this.physics.add.collider(barreira, collider);

        //Coletando as vidas
        this.physics.add.collider(vida0,  player, collectVida, null, this);
        this.physics.add.collider(vida1, player, collectVida, null, this);
        this.physics.add.collider(vida2, player, collectVida, null, this);
        this.physics.add.collider(vida3, player, collectVida, null, this);
        this.physics.add.collider(vida4, player, collectVida, null, this);
        this.physics.add.collider(vida5, player, collectVida, null, this);  
        this.physics.add.collider(vida6, player, collectVida, null, this);
        this.physics.add.collider(vida7, player, collectVida, null, this)  
        
        //Coletando os cartuchos
        this.physics.add.collider(cartucho1,  player, collectCartucho, null, this);
        this.physics.add.collider(cartucho2,  player, collectCartucho, null, this);
        this.physics.add.collider(cartucho3,  player, collectCartucho, null, this);
        this.physics.add.collider(cartucho4,  player, collectCartucho, null, this);
        this.physics.add.collider(cartucho5,  player, collectCartucho, null, this);
        this.physics.add.collider(cartucho6,  player, collectCartucho, null, this);
        this.physics.add.collider(cartucho7,  player, collectCartucho, null, this);
        this.physics.add.collider(cartucho8,  player, collectCartucho, null, this);
        this.physics.add.collider(cartucho9,  player, collectCartucho, null, this);
        this.physics.add.collider(cartucho10, player, collectCartucho, null, this);
        this.physics.add.collider(cartucho11, player, collectCartucho, null, this);
        this.physics.add.collider(cartucho12, player, collectCartucho, null, this);
        this.physics.add.collider(cartucho13, player, collectCartucho, null, this);
        this.physics.add.collider(cartucho14, player, collectCartucho, null, this);
        this.physics.add.collider(cartucho15, player, collectCartucho, null, this);
        this.physics.add.collider(cartucho16, player, collectCartucho, null, this);
        this.physics.add.collider(cartucho17, player, collectCartucho, null, this);
       

        this.physics.add.collider(player, this.enemiesGroup, deathPlayer, null, this);
        this.physics.add.collider(player, chefao1, morteSubita, null, this);
        this.physics.add.collider(this.enemiesGroup, collider);
        this.physics.add.collider(this.chefaos2Group, collider);
            
        // sons
        this.gun = this.sound.add('gun', {loop : false });
        this.pulo = this.sound.add('pulo', { loop : false});
        this.somChefao1 = this.sound.add('somChefao1', { loop : false});
        this.pegarObjetos = this.sound.add('pegarObjetos', { loop : false});
        this.explosaoChefao1 = this.sound.add('explosaoChefao1', { loop : false});
    
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
            key: 'Inimigoleft',
            frames: this.anims.generateFrameNumbers('inimigo', { start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'Inimigoturn',
            frames: [ { key: 'inimigo', frame: 6 } ],
            frameRate: 0
        });
    
        this.anims.create({
            key: 'Inimigoright',
            frames: this.anims.generateFrameNumbers('inimigo', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });  

        this.anims.create({
            key: 'Bolaturn',
            frames: [ { key: 'bola_fogo', frame: 0 } ],
            frameRate: 10
        });


        this.anims.create({
            key: 'Golemleft',
            frames: this.anims.generateFrameNumbers('golem', { start: 5, end: 9}),
            frameRate: 6,
            repeat: -1
        });
        
        this.anims.create({
            key: 'Golemturn',
            frames: [ { key: 'golem', frame: 6 } ],
            frameRate: 0
        });
    
        this.anims.create({
            key: 'Golemright',
            frames: this.anims.generateFrameNumbers('golem', { start: 0, end: 4}),
            frameRate: 6,
            repeat: -1
        }); 

        this.anims.create({
            key: 'Pedra',
            frames: this.anims.generateFrameNumbers('pedra', { start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        }); 
        
        

        //Acompanhando o placar e a tela
        textTela = this.add.text(20, 0,'0', {
            fontFamily: 'Arial',
            fontSize: '22px',
            backgroundColor: 'rgba(0.1, 0.4, 0.4, 0.4)',
            fill: 'Yellow'
    

        }).setScrollFactor(0);
        
        if (this.cameras.main.deadzone){
            graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);      
        }       

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
            this.physics.add.collider(bala, chefao1, deathChefao1, null, this);
            this.physics.add.collider(bala, bala1, balaChefao1, null, this);
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
                    'Qtd Balas: ' + tiro,
                    'Vidas: ' + atualVidas,
                    'Score: ' + score,
                    'Chefão1: ' + chefao1Vida]);
                } 

            else if(chefao2Vida > 0){
                textTela.setText([
                    'Qtd Balas: ' + tiro,
                    'Vidas: ' + atualVidas,
                    'Score: ' + score,
                    'Chefão2: ' + chefao2Vida]);
                }
            
            else{

                textTela.setText([
                    'Qtd Balas: ' + tiro,
                    'Vidas: ' + atualVidas,
                    'Score: ' + score,
                    'Chefão3: ' + chefao3Vida]);
            }


        }
        

        if(cursors.space.isUp && tiro > 0){
            playerPodeAtirar = 1;
        }
    }
});

function collectVida(vida){

    vida.disableBody(true, true);
    this.pegarObjetos.play();
    atualVidas = atualVidas + 2;
}

function collectCartucho(cartucho){

    cartucho.disableBody(true, true);
    this.pegarObjetos.play();
    tiro = tiro + 15;
}

function balaChefao1(bala, bala1){
    
    bala1.setVisible(false);
    bala1.setActive(false);
    bala1.body.enable = false;
    score = score + 10;
    bala.destroy(); 
}

function bala1Barreira(bala1){
    
    bala1.setVisible(false);
    bala1.setActive(false);
    bala1.body.enable = false;    
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

    if (chefao1Vida <= 6){

        chefao1.setTint(0xffA500);        
    }

    if (chefao1Vida <= 3){

        chefao1.setTint(0xff0000);        
    }
                            
    if (chefao1Vida == 0){

        chefao1.setVisible(false);
        chefao1.setActive(false);
        chefao1.body.enable = false;
        tempo.remove(false);
        chefao1.destroy();
        this.explosaoChefao1.play();
        score = score + 100;
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
    score = score + 10
    bala.destroy();  
}

function destroyBala(bala){

    bala.destroy();
}

function chefao1Atira(){

    bala1 = this.physics.add.sprite(chefao1.x-76, chefao1.y-4, 'tigre').setVelocityX(-400);
    this.somChefao1.play();
    this.physics.add.collider(bala1, collider);
    this.physics.add.collider(bala1, player, deathPlayerChefao1, null, this);
    this.physics.add.collider(bala1, barreira, bala1Barreira, null, this);
    

    
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
    scene:[Menu, Principal, Regras],

    audio: {
        disableWebAudio: true
    }
};
var game = new Phaser.Game(config);
