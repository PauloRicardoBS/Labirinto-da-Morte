import Chefao2 from "./Chefao2.js";

export default class Chefaos2 extends Phaser.Physics.Arcade.Group{

    constructor(world, scene, children, spriteArray){

        super(world, scene, children, {})
        this.scene = scene

        this.createChefaos2(scene, spriteArray)

    };

    createChefaos2(scene, spriteArray){

        spriteArray.forEach(sprite => {
            const chefao2 = new Chefao2(scene, sprite.x, sprite.y)
            this.add(chefao2)
            
            sprite.destroy()
        });
    }



}