
export default class Enemy extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){

        super(scene, x, y, 'nerudo', 0)
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
              
        const randNumber = Math.floor(Math.random()*4);
        switch (randNumber){

            case 1:
                this.anims.play('Nerudoright', true);
                this.setVelocityX(100);
                break
            case 2:
                this.anims.play('Nerudoleft', true);
                this.setVelocityX(-100);
                break
            
            default:
                this.anims.play('Nerudoturn');
                this.setVelocityX(0);
                break

        }
    }


}
