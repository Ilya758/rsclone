import Phaser from 'phaser';
import { IUserKeys } from '../../../types/globals';

export default class Person extends Phaser.Physics.Arcade.Sprite {
  private speed = 100;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
  }

  create() {
    this.setTexture('person');
    this.width = 10;
  }

  update(personControlKeys: IUserKeys): void {
    if (!personControlKeys || !this) {
      return;
    }

    if (personControlKeys.right.isDown && personControlKeys.up.isDown) {
      this.anims.play('left');
      this.setVelocity(this.speed, -this.speed);
    } else if (
      personControlKeys.right.isDown &&
      personControlKeys.down.isDown
    ) {
      this.anims.play('left');
      this.setVelocity(this.speed, this.speed);
    } else if (personControlKeys.left.isDown && personControlKeys.down.isDown) {
      this.anims.play('left');
      this.setVelocity(-this.speed, this.speed);
    } else if (personControlKeys.left.isDown && personControlKeys.up.isDown) {
      this.anims.play('left');
      this.setVelocity(-this.speed, -this.speed);
    } else if (personControlKeys.left.isDown) {
      this.anims.play('left');
      this.setVelocity(-this.speed, 0);
    } else if (personControlKeys.right.isDown) {
      this.anims.play('right');
      this.setVelocity(+this.speed, 0);
    } else if (personControlKeys.up.isDown) {
      this.anims.play('up');
      this.setVelocity(0, -this.speed);
    } else if (personControlKeys.down.isDown) {
      this.anims.play('down');
      this.setVelocity(0, +this.speed);
    } else {
      this.anims.play('right');
      this.setVelocity(0, 0);
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'person',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    const sprite = new Person(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    sprite.body.setSize(20, 20);
    return sprite;
  }
);
