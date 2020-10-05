const config = {

    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);
let player;
var bala, shoot, graphics, cursors, collider, camera, inimigos, 
    playerPodeAtirar = 1, textTela, tiro = 20, tileset, groud, groud2, 
    map, vidaGroup, maxVidas = 10, atualVidas = 2, nerudoVida = 2;

function preload(){

    this.load.image("tiles", "img/cenario.png");
    this.load.image('vida', 'img/coração.png')
    this.load.tilemapTiledJSON("map", "Labirinto da Morte.json");
    this.load.spritesheet('dude', "img/player2.png", {frameWidth: 49, frameHeight: 48});
    this.load.spritesheet('nerudo', 'img/personagens/Nerudo.png', {frameWidth: 129.7, frameHeight: 167});
    this.load.image('bala', "img/bala.png");
    this.load.image('deserto', "img/deserto.png");
    this.load.image('ceu', "img/céu estrelado.png");
    this.load.audio('gun', 'sons/gun.wav');
    this.load.audio('pulo', 'sons/pulo.mp3');
    
}

function create(){

    //imagens e mapa   
    this.add.image(1622, 2650, 'ceu');
    this.add.image(1602, 1617, 'deserto');
    map = this.make.tilemap({key : "map"});
    tileset = map.addTilesetImage("cenario", "tiles");
    groud = map.createStaticLayer("groud", tileset, 0, 0);
   
    

    //Player e colisões
    player = this.physics.add.sprite(2400,600, 'dude');
    Nerudo = this.physics.add.sprite(2400, 1920, 'nerudo');
    groud2 = map.createStaticLayer("groud2", tileset, 0, 0);
    cursors = this.input.keyboard.createCursorKeys();
    cursorsFalse = this.input.keyboard.createCursorKeys();
    collider = map.createStaticLayer("colisao", tileset, 0, 0);
    collider.setCollisionByProperty({"colisao": true});   
    this.physics.add.collider(player, collider);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(Nerudo, collider);
    Nerudo.setCollideWorldBounds(true);
    this.physics.add.collider(player, Nerudo, hitDeath, null, this);
    
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
        frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 0}),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 8}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'monstroRight',
        frames: this.anims.generateFrameNumbers('nerudo', { start: 0, end: 4 }),
        frameRate: 4,
    
        repeat: -1
    });

    this.anims.create({
        key: 'monstroLeft',
        frames: this.anims.generateFrameNumbers('nerudo', { start: 11, end: 6 }),
        frameRate: 4,

        repeat: -1
    });

    this.anims.create({
        key: 'monstroTurn',
        frames: [ { key: 'nerudo', frame: 5 } ],
        frameRate: 20
    });


    
    //Acompanhando o placar e a tela
    textTela = this.add.text(20, 0,'0', {
        fontFamily: 'Verdana',
        fontSize: '22px',
        fill: 'White'
    }).setScrollFactor(0);
    
    if (this.cameras.main.deadzone){
        graphics = this.add.graphics().setScrollFactor(0);
        graphics.lineStyle(2, 0x00ff00, 1);
        graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);      
    }



    //Colisão para ganhar uma vida
    vidaGroup = this.physics.add.staticGroup({
        key: 'vida',
        frameQuantity: 1,
        immovable: true
    });

    var children  = vidaGroup.getChildren();

    for (var i = 0; i < children.length; i++){  

        var x = Phaser.Math.Between(2300, 2300);
        var y = Phaser.Math.Between(1200, 1200); 
        
        children[i].setPosition(x, y);
    }
    vidaGroup.refresh();    
    this.physics.add.overlap(player, vidaGroup, spriteHitHealth);  
   
    
    Nerudo.setBounce(1);    
   
}

 function spriteHitHealth (player, vida){    
    vidaGroup.killAndHide(vida);
    vida.body.enable = false;
    atualVidas = Phaser.Math.MaxAdd(atualVidas, 1, maxVidas);

}

function update(){

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
        
        bala = this.physics.add.sprite(player.x-37, player.y+5, 'bala');
        bala.setVelocityX(-1000);
        playerPodeAtirar = 0;  
        this.gun.play();          
        tiro = tiro -1;
        if (tiro < 0){
            playerPodeAtirar = 0;
        }
        
        //this.physics.add.collider(bala, Nerudo, deathNerudo);

        

    }

    if(cursors.right.isDown && cursors.space.isDown && playerPodeAtirar == 1){
        
        bala = this.physics.add.sprite(player.x+39, player.y+5, 'bala');
        bala.setVelocityX(1200);
        playerPodeAtirar = 0;
        this.gun.play();
        tiro = tiro -1;
        if (tiro < 0){
            playerPodeAtirar = 0;
        }
                
        this.physics.add.collider(bala, Nerudo, deathNerudo, null);
        //bala.setCollideWorldBounds(false);
        
        
        }

    if (cursors.up.isDown){
        
        if(player.body.onFloor()){
            this.pulo.play();
            player.body.setVelocityY(-450);
    }

    }

    if (cursors.down.isUp){

        if(Nerudo.body.velocity.x > 0){
            Nerudo.anims.play('monstroRight', true);}
        else {
            Nerudo.anims.play('monstroLeft', true);
            Nerudo.setVelocityX(-100);
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
        textTela.setText([

            'LABIRINTO' + '\n' +
            'Qtd Balas: ' + tiro + '\n' + 'Vidas: ' + atualVidas,
        ]);
    }

    if(cursors.space.isUp && tiro > 0){
        playerPodeAtirar = 1;
    }
}

function hitDeath (player, Nerudo){

    this.physics.pause();
    player.setTint(0x000000);
    player.anims.play('turn');
    gameOver = true;

}

function deathNerudo(bala, Nerudo){

    nerudoVida = nerudoVida - 1;  
    if (nerudoVida == 0){

        this.physics.add.overlap(bala, Nerudo);
        Nerudo.body.velocity.x = 1;
        //Nerudo.destroy();
        gameOver = false;
        
    }

}

