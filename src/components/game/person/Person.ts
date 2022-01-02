import Phaser from 'phaser';

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
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    if (!cursors || !this) {
      return;
    }

    if (cursors.left.isDown) {
      // left
      this.anims.play('left');
      this.setVelocity(-this.speed, 0);
    } else if (cursors.right.isDown) {
      // right
      this.anims.play('right');
      this.setVelocity(+this.speed, 0);
    } else if (cursors.up.isDown) {
      // up
      this.anims.play('up');
      this.setVelocity(0, -this.speed);
    } else if (cursors.down.isDown) {
      // down
      this.anims.play('down');
      this.setVelocity(0, +this.speed);
    } else {
      // stand position
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

    return sprite;
  }
);
