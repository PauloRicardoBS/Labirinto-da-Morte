import Enemies from "./Enemies.js";

var player, golem, score = 0, highScore = 0, tempo, tempo1, tempo2, tempo3, tempo4, fim, plataforma, fogoCanhao, chefao1, chefao2,
    chefao3, barreira, barreira2, chefao1Vida = 15, chefao2Vida = 25, chefao3Vida = 40, bala, bala1, bala2, bala3_1, bala3_2, bala3_3,
    graphics, cursors, collider, camera, playerPodeAtirar = 1, textTela, tiro = 100, tileset, groud, groud2, atualVidas = 10, map, enter,
    botaoPlay, botaoDescricao, botaoMenu, texto,    Nerudo, tiroCaveira1, tiroCaveira2, tempoCaveira, tempoChamasD, tempoMeteoro, barCaveira1, 
    barCaveira2, chamasD, raiz;

var Menu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Menu(){
            Phaser.Scene.call(this, {key: 'Menu'});
        },
    
    preload(){
        this.load.image('menuPlay', 'img/Menu_Inicial.png');
        this.load.image('botaoP', 'img/botao_play.png');
        this.load.image('botaoR', 'img/botao_regras.png'); 
        this.load.image('botao', 'img/button.png');          
    }, 
    
    create(){
        this.add.image(500, 400, 'menuPlay');
        botaoPlay = this.add.image(460, 395, 'botaoP').setInteractive();
        botaoDescricao = this.add.image(620, 395, 'botaoR').setInteractive();
        
       
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
        botaoMenu = this.add.image(910, 645, 'botao').setInteractive();

        texto = this.add.text(game.config.width /1.12, game.config.height /1.19, 'Menu',
        {fontSize:'40px', fill:"red"}).setOrigin(0.5);

        botaoMenu.on('pointerdown',() => {
            this.scene.start('Menu');
        });         
    },

    update(){
        
    }   
})

var GameOver = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Regras(){
            Phaser.Scene.call(this, {key: 'GameOver'});
        },
    
    preload(){
        this.load.image('Gover', 'img/game-over.png');    
    }, 
    
    create(){

        this.add.image(500, 400, 'Gover');
        botaoMenu = this.add.image(910, 645, 'botao').setInteractive();

        texto = this.add.text(game.config.width /1.12, game.config.height /1.19, 'Menu',
        {fontSize:'40px', fill:"red"
        }).setOrigin(0.5);

        texto = this.add.text(game.config.width/6.3, game.config.height/7, 'Pontuação:',
            {fontSize:'40px', fill:"white"}).setOrigin(0.5);

        texto = this.add.text(game.config.width/3, game.config.height/7, score,
        {fontSize:'40px', fill:"white"}).setOrigin(0.5);

        texto = this.add.text(game.config.width/1.7, game.config.height/7, 'Recorde:',
        {fontSize:'40px', fill:"white"}).setOrigin(0.5);

        texto = this.add.text(game.config.width/1.3, game.config.height/7, highScore,
        {fontSize:'40px', fill:"white"}).setOrigin(0.5);

        botaoMenu.on('pointerdown',() => {
            this.scene.start('Menu');         
        });         
    },

    update(){

        atualVidas = 6;
        tiro = 65;

        if(highScore < score){
            highScore = score;
        }

        score = 0;          
    }   
})

var GameWiner = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Regras(){
            Phaser.Scene.call(this, {key: 'GameWiner'});
        },
    
    preload(){
        this.load.image('GWiner', 'img/Menu_Final.png');    
    }, 
    
    create(){

        this.add.image(500, 400, 'GWiner');
        botaoMenu = this.add.image(890, 645, 'botao').setInteractive();

        texto = this.add.text(game.config.width /1.15, game.config.height /1.19, 'Menu',
        {fontSize:'40px', fill:"red"}).setOrigin(0.5);

        texto = this.add.text(game.config.width/6.3, game.config.height/7, 'Pontuação:',
            {fontSize:'40px', fill:"black"}).setOrigin(0.5);

        texto = this.add.text(game.config.width/3, game.config.height/7, score,
        {fontSize:'40px', fill:"black"}).setOrigin(0.5);

        texto = this.add.text(game.config.width/1.8, game.config.height/7, 'Recorde:',
        {fontSize:'40px', fill:"black"}).setOrigin(0.5);

        texto = this.add.text(game.config.width/1.4, game.config.height/7, highScore,
        {fontSize:'40px', fill:"black"}).setOrigin(0.5);

        botaoMenu.on('pointerdown',() => {
            this.scene.start('Menu');         
        });         

        botaoMenu.on('pointerdown',() => {
            this.scene.start('Menu');
        });         
    },

    update(){

        atualVidas = 6;
        tiro = 65;

        if(highScore < score){
            highScore = score;
        }
        score = 0;        
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
        this.load.spritesheet('inimigo', 'img/personagens/inimigo1.png', {frameWidth: 55, frameHeight: 54});
        this.load.image('meteoro', 'img/meteoro.png');
        this.load.image('chefe1', 'img/personagens/chefão01.png');
        this.load.image('chefe2', 'img/personagens/chefão02.png');
        this.load.image('chefe3', 'img/personagens/chefao3_1.png');
        this.load.image('fim', "img/taça.png");
        this.load.image('barreira', 'img/barreira.png');
        this.load.image('barreira2', 'img/barreira2.png');
        this.load.image('caveiraBarreira1', 'img/barreiraCaveira1.png');
        this.load.image('caveiraBarreira2', 'img/barreiraCaveira2.png');
        this.load.image('chamasD', 'img/chamasD.png');
        this.load.image('bala', "img/bala.png");
        this.load.image('bola_fogo', "img/bola_fogo.png");
        this.load.spritesheet('pedra', "img/pedra.png",{frameWidth: 49, frameHeight: 48});
        this.load.image('balaChefao1', "img/bala_chefao1.png");
        this.load.image('balaChefao2', "img/balaChefao2.png");
        this.load.image('balaChefao3_1', "img/fogo_canhao.png");
        this.load.image('balaChefao3_2', "img/bala_chefao3_1.png");
        this.load.image('balaChefao3_3', "img/fogo_chefao3.png");        
        this.load.image('deserto', "img/deserto.png");
        this.load.image('fase3', "img/fase3.png");
        this.load.image('cartucho', "img/cartucho.png");        
        this.load.image('ceu', "img/céu estrelado.png");
        this.load.image('caveiraR', 'img/caveiraR.png');
        this.load.image('caveiraL', 'img/caveiraL.png');
        this.load.image('raiz', 'img/raiz.png');
        this.load.image('plataforma', 'img/plataforma.png');
        this.load.audio('gun', 'sons/gun.mp3');
        this.load.audio('pulo', 'sons/pulo.mp3'); 
        this.load.audio('somChefao1', 'sons/som_chefao1.mp3');
        this.load.audio('pegarObjetos', 'sons/pegar_objetos.mp3'); 
        this.load.audio('explosaoChefao1', 'sons/explosao_chefao1.mp3'); 
        this.load.audio('somChefao2', 'sons/Explosion1.mp3');
        this.load.audio('morte', 'sons/morte.mp3'); 
        this.load.audio('derrubado', 'sons/derrubado.mp3');  
        this.load.audio('TUnico', 'sons/TUnico.mp3');            
    },

    create(){
       
        tempo = this.time.addEvent({
            delay: 2000,
            callback: chefao1Atira,
            loop: true, 
            callbackScope: this,
            hasDispatched : true
        });

        tempo1 = this.time.addEvent({
            delay: 2000, 
            callback: chefao2Atira,
            loop: true, 
            callbackScope: this,
            hasDispatched : true
        });

        tempo2 = this.time.addEvent({
            delay: 5000, 
            callback: chefao3Atira3_3,
            loop: true, 
            callbackScope: this,
            hasDispatched : true
        }); 
        
        tempo3 = this.time.addEvent({
            delay: 2000, 
            callback: chefao3Atira3_2,
            loop: true, 
            callbackScope: this,
            hasDispatched : true
        }); 

        tempo4 = this.time.addEvent({
            delay: 4000, 
            callback: chefao3Atira3_1,
            loop: true, 
            callbackScope: this,
            hasDispatched : true
        });
        
        tempoCaveira = this.time.addEvent({
            delay:6000,
            callback: caveira,
            loop: true,
            callbackScope: this
        });

        tempoChamasD = this.time.addEvent({
            delay:1500,
            callback: chamasDown,
            loop: true,
            callbackScope: this
        });

        tempoMeteoro = this.time.addEvent({
            delay:16000,
            callback: meterosDown,
            loop: true,
            callbackScope: this
        });

        //imagens e mapa  
        this.add.image(1602, 576, 'fase3');
        this.add.image(1622, 2650, 'ceu');
        this.add.image(1602, 1617, 'deserto');
        map = this.make.tilemap({key : "map"});
        tileset = map.addTilesetImage("cenario", "tiles");
        groud = map.createStaticLayer("groud", tileset, 0, 0);
        barreira = this.physics.add.staticImage(1990, 2276, 'barreira').refreshBody();  
        barreira2 = this.physics.add.staticImage(1010, 1180, 'barreira2').refreshBody();
        plataforma = this.physics.add.staticImage(1600, 3200, 'plataforma').refreshBody();
        barCaveira1 = this.physics.add.staticImage(150, 2005, 'caveiraBarreira1').refreshBody();
        barCaveira2 = this.physics.add.staticImage(3013, 2005, 'caveiraBarreira2').refreshBody();
        raiz = this.physics.add.staticImage(1907, 1608, 'raiz').refreshBody();

        
        //Vidas no jogo
        var vida0 = this.physics.add.staticImage(2300, 1300, 'vida').refreshBody();
        var vida1 = this.physics.add.staticImage(500,  2000, 'vida').refreshBody();
        var vida2 = this.physics.add.staticImage(3000, 2250, 'vida').refreshBody();
        var vida3 = this.physics.add.staticImage(77,    851, 'vida').refreshBody();
        var vida4 = this.physics.add.staticImage(2129, 1230, 'vida').refreshBody();
        var vida5 = this.physics.add.staticImage(2510,  106, 'vida').refreshBody();
        var vida6 = this.physics.add.staticImage(151,  2927, 'vida').refreshBody();
        var vida7 = this.physics.add.staticImage(2562, 2524, 'vida').refreshBody();
        var vida8 = this.physics.add.staticImage(1950,   96, 'vida').refreshBody();
        var vida9 = this.physics.add.staticImage(165,  1180, 'vida').refreshBody();
        var vida10 = this.physics.add.staticImage(165,  1180, 'vida').refreshBody();

        //Cartuchos de balas
        var cartucho1 = this.physics.add.staticImage(1807,   894, 'cartucho').refreshBody();
        var cartucho2 = this.physics.add.staticImage(2070,   264, 'cartucho').refreshBody();
        var cartucho3 = this.physics.add.staticImage(78,    2915, 'cartucho').refreshBody();
        var cartucho4 = this.physics.add.staticImage(1106,  2893, 'cartucho').refreshBody();
        var cartucho5 = this.physics.add.staticImage(924,   2333, 'cartucho').refreshBody();
        var cartucho6 = this.physics.add.staticImage(2290,  2272, 'cartucho').refreshBody();
        var cartucho7 = this.physics.add.staticImage(2744,  1989, 'cartucho').refreshBody();
        var cartucho8 = this.physics.add.staticImage(1959,  1532, 'cartucho').refreshBody();
        var cartucho9 = this.physics.add.staticImage(2814,  1356, 'cartucho').refreshBody();
        var cartucho10 = this.physics.add.staticImage(2399, 1226, 'cartucho').refreshBody();
        var cartucho11 = this.physics.add.staticImage(1383,  227, 'cartucho').refreshBody();
        var cartucho12 = this.physics.add.staticImage(2707,  106, 'cartucho').refreshBody();
        var cartucho13 = this.physics.add.staticImage(1608,  495, 'cartucho').refreshBody();
        var cartucho14 = this.physics.add.staticImage(1873,  906, 'cartucho').refreshBody();
        var cartucho15 = this.physics.add.staticImage(2649, 1195, 'cartucho').refreshBody();
        var cartucho16 = this.physics.add.staticImage(2860, 1060, 'cartucho').refreshBody();
        var cartucho17 = this.physics.add.staticImage(2910, 2558, 'cartucho').refreshBody();
        var cartucho18 = this.physics.add.staticImage(223,  2726, 'cartucho').refreshBody();
        var cartucho19 = this.physics.add.staticImage(93,   2735, 'cartucho').refreshBody();
        var cartucho20 = this.physics.add.staticImage(592,  2732, 'cartucho').refreshBody();

        //Player e colisões
        this.enemies = map.createFromObjects("inimigo", "inimigo", {});
        this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);      
        
        player = this.physics.add.sprite(250, 3050, 'paul');
        chefao1 = this.physics.add.staticImage(3000, 2256 , 'chefe1').refreshBody();
        chefao2 = this.physics.add.staticImage(165, 1180 , 'chefe2').refreshBody();
        chefao3 = this.physics.add.staticImage(3050, 220 , 'chefe3').refreshBody();
        fim = this.physics.add.staticImage(3147, 300 , 'fim').refreshBody();
        groud2 = map.createStaticLayer("groud2", tileset, 0, 0);
        cursors = this.input.keyboard.createCursorKeys();
        collider = map.createStaticLayer("colisao", tileset, 0, 0);
        collider.setCollisionByProperty({"colisao": true});
        this.physics.add.collider(player, collider);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(chefao1, collider); 
        this.physics.add.collider(chefao2, collider);
        this.physics.add.collider(chefao3, collider);
        this.physics.add.collider(fim, collider);
        this.physics.add.collider(barreira2, collider);
        this.physics.add.collider(barreira, collider);
        this.physics.add.collider(barCaveira1, collider);
        this.physics.add.collider(barCaveira2, collider);
        this.physics.add.collider(raiz, collider);

        //Coletando as vidas
        this.physics.add.collider(vida0,  player, collectVida, null, this);
        this.physics.add.collider(vida1, player, collectVida, null, this);
        this.physics.add.collider(vida2, player, collectVida, null, this);
        this.physics.add.collider(vida3, player, collectVida, null, this);
        this.physics.add.collider(vida4, player, collectVida, null, this);
        this.physics.add.collider(vida5, player, collectVida, null, this);  
        this.physics.add.collider(vida6, player, collectVida, null, this);
        this.physics.add.collider(vida7, player, collectVida, null, this);
        this.physics.add.collider(vida8, player, collectVida, null, this); 
        this.physics.add.collider(vida9, player, collectVida, null, this); 
        this.physics.add.collider(vida10, player, collectVida, null, this); 
        
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
        this.physics.add.collider(cartucho18, player, collectCartucho, null, this);
        this.physics.add.collider(cartucho19, player, collectCartucho, null, this);
        this.physics.add.collider(cartucho20, player, collectCartucho, null, this);
        this.physics.add.collider(player, this.enemiesGroup, deathPlayer, null, this);
        this.physics.add.collider(player, chefao1, morteSubita, null, this);
        this.physics.add.collider(player, chefao2, morteSubita, null, this);
        this.physics.add.collider(player, chefao3, morteSubita, null, this);
        this.physics.add.collider(this.enemiesGroup, collider);
        this.physics.add.collider(player, fim, gameWiner, null, this);
            
        // sons
        this.gun = this.sound.add('gun', {loop : false });
        this.pulo = this.sound.add('pulo', { loop : false});
        this.somChefao1 = this.sound.add('somChefao1', { loop : false});
        this.somChefao2 = this.sound.add('somChefao2', { loop : false});
        this.pegarObjetos = this.sound.add('pegarObjetos', { loop : false});
        this.explosaoChefao1 = this.sound.add('explosaoChefao1', { loop : false});
        this.morte = this.sound.add('morte', { loop : false});
        this.derrubado = this.sound.add('derrubado', { loop : false});
        this.somChefao3 = this.sound.add('TUnico', { loop : false});
            
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
            frames: this.anims.generateFrameNumbers('paul', { start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'Inimigoleft',
            frames: this.anims.generateFrameNumbers('inimigo', { start: 2, end: 0}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'Inimigoturn',
            frames: [ { key: 'inimigo', frame: 3 } ],
            frameRate: 0
        });
    
        this.anims.create({
            key: 'Inimigoright',
            frames: this.anims.generateFrameNumbers('inimigo', { start: 4, end: 6}),
            frameRate: 10,
            repeat: -1
        });  

        this.anims.create({
            key: 'Bolaturn',
            frames: [ { key: 'bola_fogo', frame: 0 } ],
            frameRate: 10
        });

        this.anims.create({
            key: 'Meteoro',
            frames: [ { key: 'meteoro', frame: 0 } ],
            frameRate: 10
        }); 
        
        //Acompanhando o placar e a tela
        textTela = this.add.text(20, 0,'0', {
            fontFamily: 'pixelFont',
            fontSize: '28px',
            backgroundColor: 'rgba(0.6, 0.5, 0.5, 0.6)',
            fill: 'yellow'
    
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
            this.physics.add.collider(bala, chefao2, deathChefao2, null, this);
            this.physics.add.collider(bala, chefao3, deathChefao3, null, this);
            this.physics.add.collider(bala, bala1, balaChefao1, null, this);
            this.physics.add.collider(bala, bala2, balaChefao2, null, this);
            this.physics.add.collider(bala, bala3_1, balaChefao3, null, this);
            this.physics.add.collider(bala, tiroCaveira1, balaCaveira1, null, this);
            this.physics.add.collider(bala, tiroCaveira2, balaCaveira2, null, this);
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
            this.physics.add.collider(bala, chefao2, deathChefao2, null, this);
            this.physics.add.collider(bala, chefao3, deathChefao3, null, this);
            this.physics.add.collider(bala, bala1, balaChefao1, null, this);
            this.physics.add.collider(bala, bala2, balaChefao2, null, this);
            this.physics.add.collider(bala, bala3_1, balaChefao3, null, this);
            this.physics.add.collider(bala, tiroCaveira1, balaCaveira1, null, this);
            this.physics.add.collider(bala, tiroCaveira2, balaCaveira2, null, this);
            bala.setCollideWorldBounds(true); 

        }

        if (cursors.up.isDown){
            
            if(player.body.onFloor()){
                this.pulo.play();
                player.body.setVelocityY(-400);
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
                    'Recorde: ' + highScore,
                    'Munição: ' + tiro,
                    'Vidas: ' + atualVidas,
                    'Score: ' + score,
                    'Chefão1: ' + chefao1Vida]);
                } 

            else if(chefao2Vida > 0){
                textTela.setText([
                    'Recorde: ' + highScore,
                    'Munição: ' + tiro,
                    'Vidas: ' + atualVidas,
                    'Score: ' + score,
                    'Chefão2: ' + chefao2Vida]);
                }
            
            else{

                textTela.setText([
                    'Recorde: ' + highScore,
                    'Munição: ' + tiro,
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
    atualVidas = atualVidas + 1;
    score = score + 1;
}

function collectCartucho(cartucho){

    cartucho.disableBody(true, true);
    this.pegarObjetos.play();
    tiro = tiro + 15;
    score = score + 1;
}

function balaCaveira1(bala, tiroCaveira1){
    
    tiroCaveira1.setVisible(false);
    tiroCaveira1.setActive(false);
    tiroCaveira1.body.enable = false;
    score = score + 25;
    bala.destroy(); 
}

function balaCaveira2(bala, tiroCaveira2){
    
    tiroCaveira2.setVisible(false);
    tiroCaveira2.setActive(false);
    tiroCaveira2.body.enable = false;
    score = score + 25;
    bala.destroy(); 
}

function balaChefao1(bala, bala1){
    
    bala1.setVisible(false);
    bala1.setActive(false);
    bala1.body.enable = false;
    score = score + 10;
    bala.destroy(); 
}

function balaChefao2(bala, bala2){
    
    bala2.setVisible(false);
    bala2.setActive(false);
    bala2.body.enable = false;
    score = score + 15;
    bala.destroy(); 
}

function balaChefao3(bala, bala2){
    
    bala2.setVisible(false);
    bala2.setActive(false);
    bala2.body.enable = false;
    score = score + 15;
    bala.destroy(); 
}


function bala1Barreira(bala1){
    
    bala1.setVisible(false);
    bala1.setActive(false);
    bala1.body.enable = false;    
}


function balaBarreira2(bala2){
    
    bala2.setVisible(false);
    bala2.setActive(false);
    bala2.body.enable = false;    
}

function caveiraBarreira1(tiroCaveira1){
    
    tiroCaveira1.setVisible(false);
    tiroCaveira1.setActive(false);
    tiroCaveira1.body.enable = false;    
}
function caveiraBarreira2(tiroCaveira2){
    
    tiroCaveira2.setVisible(false);
    tiroCaveira2.setActive(false);
    tiroCaveira2.body.enable = false;    
}

function morteSubita(player){
    
    player.setTint(0x1E90FF);
    this.physics.pause();
    player.anims.play('turn');  
    this.scene.start('GameOver');
    this.morte.play();  
    score = score - 250;
}

function deathPlayer (player, enemiesGroup){

    enemiesGroup.setVisible(false);
    enemiesGroup.setActive(false);
    enemiesGroup.body.enable = false;
    atualVidas = atualVidas - 1; 
    this.morte.play(); 
    score = score - 2;   

    if (atualVidas == 0){
        
        player.setTint(0xff0000);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }
}

function deathChefao1(bala, chefao1){
  
    chefao1Vida = chefao1Vida - 1;
    score = score + 2;
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

function deathChefao2(bala, chefao2){
  
    chefao2Vida = chefao2Vida - 1;
    score = score + 3;
    bala.destroy();

    if (chefao2Vida <= 15){
        chefao2.setTint(0xffA500);        
    }

    if (chefao2Vida <= 5){
        chefao2.setTint(0xff0000);        
    }
                            
    if (chefao2Vida == 0){
        chefao2.setVisible(false);
        chefao2.setActive(false);
        chefao2.body.enable = false;
        tempo1.remove(false);
        chefao2.destroy();
        this.explosaoChefao1.play();
        score = score + 300;
    }
}

function deathChefao3(bala, chefao3){
  
    chefao3Vida = chefao3Vida - 1;
    score = score + 5;
    bala.destroy();

    if (chefao3Vida <= 25){
        chefao2.setTint(0xffA500);        
    }

    if (chefao3Vida <= 15){
        chefao2.setTint(0xff0000);        
    }
                            
    if (chefao3Vida == 0){
        chefao3.setVisible(false);
        chefao3.setActive(false);
        chefao3.body.enable = false;
        tempo2.remove(false);
        tempo3.remove(false);
        tempo4.remove(false);
        chefao3.destroy();
        this.explosaoChefao1.play();
        score = score + 500;
    }
}

function deathPlayerChefao (bala1, player){
    atualVidas = atualVidas - 1; 
    score = score - 6;
    this.morte.play(); 
    bala1.setVisible(false);
    bala1.setActive(false);
    bala1.body.enable = false;

    if (atualVidas == 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function caveira1Player (tiroCaveira1, player){
    atualVidas = atualVidas - 1; 
    score = score - 16;
    this.morte.play(); 
    tiroCaveira1.setVisible(false);
    tiroCaveira1.setActive(false);
    tiroCaveira1.body.enable = false;

    if (atualVidas == 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function caveira2Player (tiroCaveira2, player){
    atualVidas = atualVidas - 1; 
    score = score - 16;
    this.morte.play(); 
    tiroCaveira2.setVisible(false);
    tiroCaveira2.setActive(false);
    tiroCaveira2.body.enable = false;

    if (atualVidas == 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function chamaDPlayer(chamasD, player){
    atualVidas = atualVidas - 4; 
    score = score - 100;
    this.morte.play(); 
    chamasD.setVisible(false);
    chamasD.setActive(false);
    chamasD.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD1Player(meteoroD1, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD1.setVisible(false);
    meteoroD1.setActive(false);
    meteoroD1.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD2Player(meteoroD2, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD2.setVisible(false);
    meteoroD2.setActive(false);
    meteoroD2.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD3Player(meteoroD3, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD3.setVisible(false);
    meteoroD3.setActive(false);
    meteoroD3.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD4Player(meteoroD4, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD4.setVisible(false);
    meteoroD4.setActive(false);
    meteoroD4.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD5Player(meteoroD5, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD5.setVisible(false);
    meteoroD5.setActive(false);
    meteoroD5.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD6Player(meteoroD6, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD6.setVisible(false);
    meteoroD6.setActive(false);
    meteoroD6.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD7Player(meteoroD7, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD7.setVisible(false);
    meteoroD7.setActive(false);
    meteoroD7.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD8Player(meteoroD8, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD8.setVisible(false);
    meteoroD8.setActive(false);
    meteoroD8.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD9Player(meteoroD9, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD9.setVisible(false);
    meteoroD9.setActive(false);
    meteoroD9.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}

function meteoroD10Player(meteoroD10, player){
    atualVidas = atualVidas - 1; 
    score = score - 10;
    this.morte.play(); 
    meteoroD10.setVisible(false);
    meteoroD10.setActive(false);
    meteoroD10.body.enable = false;

    if (atualVidas <= 0){   
        player.setTint(0x1E90FF);
        this.physics.pause();
        player.anims.play('turn');
        this.scene.start('GameOver');
    }  
}


function gameWiner(){  
    
    if(highScore < score){
        highScore = score;
    }

    this.scene.start('GameWiner');
}

function deathNerudo(bala, enemiesGroup){
    
    enemiesGroup.setVisible(false);
    enemiesGroup.setActive(false);
    enemiesGroup.body.enable = false;
    this.derrubado.play();
    score = score + 10;
    bala.destroy();  
}

function destroyBala(bala){
    bala.destroy();
}

function destroyBala3_3(bala3_3){
    bala3_3.destroy();
}

function destroychamasD(chamasD){
    chamasD.destroy();
}

function destroyMeteoroD1(meteoroD1){
    meteoroD1.destroy();
}

function destroyMeteoroD2(meteoroD2){
    meteoroD2.destroy();
}

function destroyMeteoroD3(meteoroD3){
    meteoroD3.destroy();
}

function destroyMeteoroD4(meteoroD4){
    meteoroD4.destroy();
}

function destroyMeteoroD5(meteoroD5){
    meteoroD5.destroy();
}

function destroyMeteoroD6(meteoroD6){
    meteoroD6.destroy();
}

function destroyMeteoroD7(meteoroD7){
    meteoroD7.destroy();
}

function destroyMeteoroD8(meteoroD8){
    meteoroD8.destroy();
}

function destroyMeteoroD9(meteoroD9){
    meteoroD9.destroy();
}

function destroyMeteoroD10(meteoroD10){
    meteoroD10.destroy();
}

function chefao1Atira(){ 
    bala1 = this.physics.add.sprite(chefao1.x-76, chefao1.y-4, 'balaChefao1').setVelocityX(-400);
    this.somChefao1.play();
    this.physics.add.collider(bala1, collider);
    this.physics.add.collider(bala1, player, deathPlayerChefao, null, this);
    this.physics.add.collider(bala1, barreira, bala1Barreira, null, this);    
}

function chefao2Atira(){ 
    bala2 = this.physics.add.sprite(chefao2.x+76, chefao2.y-1, 'balaChefao2').setVelocityX(400);
    this.somChefao2.play();
    this.physics.add.collider(bala2, collider);
    this.physics.add.collider(bala2, player, deathPlayerChefao, null, this);
    this.physics.add.collider(bala2, barreira2, balaBarreira2, null, this);    
}

function chefao3Atira3_1(){ 
    bala3_1 = this.physics.add.sprite(chefao3.x-40, chefao3.y-114, 'balaChefao3_1').setVelocityX(-400);
    this.somChefao2.play();
    this.physics.add.collider(bala3_1, collider, destroyBala3_3);
    this.physics.add.collider(bala3_1, player, deathPlayerChefao, null, this);
       
}

function chefao3Atira3_2(){ 
    bala3_2 = this.physics.add.sprite(chefao3.x-120, chefao3.y, 'balaChefao3_2').setVelocityX(-600);
    this.somChefao3.play();
    this.physics.add.collider(bala3_2, collider, destroyBala3_3);
    this.physics.add.collider(bala3_2, player, deathPlayerChefao, null, this);       
}

function chefao3Atira3_3(){ 
    bala3_3 = this.physics.add.sprite(chefao3.x-90, chefao3.y+85, 'balaChefao3_3').setVelocityX(-400);
    this.somChefao2.play();
    this.physics.add.collider(bala3_3, collider, destroyBala3_3);
    this.physics.add.collider(bala3_3, player, deathPlayerChefao, null, this);    
}

function caveira(){ 
    tiroCaveira1 = this.physics.add.sprite(20, 1921, 'caveiraR').setVelocityX(450);
    tiroCaveira2 = this.physics.add.sprite(3042,1921, 'caveiraL').setVelocityX(-500); 
    this.physics.add.collider(tiroCaveira1, collider);
    this.physics.add.collider(tiroCaveira2, collider);
    this.physics.add.collider(tiroCaveira1, barCaveira2, caveiraBarreira1, null, this);
    this.physics.add.collider(tiroCaveira2, barCaveira1, caveiraBarreira2, null, this);
    this.physics.add.collider(tiroCaveira1, player, caveira1Player, null, this);
    this.physics.add.collider(tiroCaveira2, player, caveira2Player, null, this);

}

function chamasDown(){ 
    chamasD = this.physics.add.sprite(1910, 1488, 'chamasD');
    this.physics.add.collider(chamasD, raiz, destroychamasD, null, this); 
    this.physics.add.collider(chamasD, player, chamaDPlayer, null, this);
}

function meterosDown(){ 
    var meteoroD1 = this.physics.add.sprite(2181, 863, 'meteoro').setVelocityY(-50);
    var meteoroD2 = this.physics.add.sprite(1512, 345, 'meteoro').setVelocityY(-50);
    var meteoroD3 = this.physics.add.sprite(1000, 360, 'meteoro').setVelocityY(-50);
    var meteoroD4 = this.physics.add.sprite(1890, 1013, 'meteoro').setVelocityY(-50);
    var meteoroD5 = this.physics.add.sprite(293, 969, 'meteoro').setVelocityY(-50);
    var meteoroD6 = this.physics.add.sprite(827, 915, 'meteoro').setVelocityY(-50);
    var meteoroD7 = this.physics.add.sprite(3027, 606, 'meteoro').setVelocityY(-50);
    var meteoroD8 = this.physics.add.sprite(2715, 942, 'meteoro').setVelocityY(-50);
    var meteoroD9 = this.physics.add.sprite(1430, 960, 'meteoro').setVelocityY(-50);
    var meteoroD10 = this.physics.add.sprite(427, 848, 'meteoro').setVelocityY(-50);
    

    this.physics.add.collider(meteoroD1, plataforma, destroyMeteoroD1, null, this);
    this.physics.add.collider(meteoroD2, plataforma, destroyMeteoroD2, null, this);
    this.physics.add.collider(meteoroD3, plataforma, destroyMeteoroD3, null, this);
    this.physics.add.collider(meteoroD4, plataforma, destroyMeteoroD4, null, this);
    this.physics.add.collider(meteoroD5, plataforma, destroyMeteoroD5, null, this); 
    this.physics.add.collider(meteoroD6, plataforma, destroyMeteoroD6, null, this);
    this.physics.add.collider(meteoroD7, plataforma, destroyMeteoroD7, null, this);
    this.physics.add.collider(meteoroD8, plataforma, destroyMeteoroD8, null, this);
    this.physics.add.collider(meteoroD9, plataforma, destroyMeteoroD9, null, this);
    this.physics.add.collider(meteoroD10, plataforma, destroyMeteoroD10, null, this);

    this.physics.add.collider(meteoroD1, player, meteoroD1Player, null, this);
    this.physics.add.collider(meteoroD2, player, meteoroD2Player, null, this);
    this.physics.add.collider(meteoroD3, player, meteoroD3Player, null, this);
    this.physics.add.collider(meteoroD4, player, meteoroD4Player, null, this);
    this.physics.add.collider(meteoroD5, player, meteoroD5Player, null, this);
    this.physics.add.collider(meteoroD6, player, meteoroD6Player, null, this);
    this.physics.add.collider(meteoroD7, player, meteoroD7Player, null, this);
    this.physics.add.collider(meteoroD8, player, meteoroD8Player, null, this);
    this.physics.add.collider(meteoroD9, player, meteoroD9Player, null, this);
    this.physics.add.collider(meteoroD10, player, meteoroD10Player, null, this);

}

const config = {

    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false,
        }
    },
    scene:[Menu, Principal, Regras, GameOver, GameWiner],

    audio: {
        disableWebAudio: true
    }
};
var game = new Phaser.Game(config);
