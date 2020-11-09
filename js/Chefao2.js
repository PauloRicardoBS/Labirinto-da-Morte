export default class Chefao2 extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){

        super(scene, x, y, 'golem', 0)
        this.scene = scene

        this.scene.physics.world.enable(this)

        this.scene.add.existing(this)

        this.timeEvent = this.scene.time.addEvent({
            delay : 1000,
            callback : this.mover,
            loop : true,
            callbackScope : this
        })
       
    }

    mover(){
              
        const escNumber = Math.floor(Math.random()*2);


        switch (escNumber){

            case 1:
                
                this.anims.play('Golemright', true);
                this.setVelocityX(200);
                break

            case 2:

                this.anims.play('Golemleft', true);
                this.setVelocityX(-200);
                break
            
            default:

                this.anims.play('Golemturn');
                this.setVelocityX(0);
                break
            
        }

    
}


}