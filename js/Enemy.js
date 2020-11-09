
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
              
        const randNumber = Math.floor(Math.random()*6);


        switch (randNumber){

            case 1:
                
                this.anims.play('Inimigoright', true);
                this.setVelocityX(200);
                break

            case 2:

                this.anims.play('Inimigoleft', true);
                this.setVelocityX(-200);
                break

            case 3:
                
                this.anims.play('Bolaturn', true);
                this.setVelocityX(350);
                break

            case 4:
                
                this.anims.play('Bolaturn', true);
                this.setVelocityX(-350);
                break
            
            default:

                this.anims.play('Inimigoturn');
                this.setVelocityX(0);
                break
            
        }

    
}


}
