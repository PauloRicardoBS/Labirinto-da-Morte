import Enemy from "./Enemy.js";

export default class Enemies extends Phaser.Physics.Arcade.Group{

    constructor(world, scene, children, spriteArray){

        super(world, scene, children, {})
        this.scene = scene

        this.createEnemies(scene, spriteArray)

    };

    createEnemies(scene, spriteArray){

        spriteArray.forEach(sprite => {
            const enemy = new Enemy(scene, sprite.x, sprite.y)
            const bala = new Enemy(scene, sprite.x+5, sprite.y)

            this.add(enemy)
            this.add(bala)

            sprite.destroy()
        });

    }



}