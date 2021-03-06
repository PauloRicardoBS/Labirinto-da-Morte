
export default class Enemy extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){

        super(scene, x, y, 'inimigo', 0)
        this.scene = scene

        this.scene.physics.world.enable(this)

        this.scene.add.existing(this)

        this.timeEvent = this.scene.time.addEvent({
            delay : 1000,
            callback : this.move,
            loop : true,
            callbackScope : this
        })
       
    }

    move(){
              
        const randNumber = Math.floor(Math.random()*9);


        switch (randNumber){

            case 1:
                
                this.anims.play('Inimigoright', true);
                this.setVelocityX(200);
                this.setGravityY(400);
                break

            case 2:

                this.anims.play('Inimigoleft', true);
                this.setVelocityX(-200);
                this.setGravityY(400);                
                break

            case 3:
                
                this.anims.play('Bolaturn', true);
                this.setVelocityX(400);
                this.setGravityY(400);
                break

            case 4:
                
                this.anims.play('Bolaturn', true);
                this.setVelocityX(-400);
                this.setGravityY(400);
                break

            case 5:
                
                this.anims.play('Bolaturn', true);
                this.setVelocityX(400);
                this.setGravityY(400);
                break

            case 6:
                
                this.anims.play('Bolaturn', true);
                this.setVelocityX(-400);
                this.setGravityY(400);
                break
            
             case 7:
                
                this.anims.play('Bolaturn', true);
                this.setVelocityX(200);
                this.setGravityY(400);
                break
            
            default:

                this.anims.play('Inimigoturn');
                this.setVelocityX(0);
                this.setGravityY(400);
                break
            
        }

    
}


}
