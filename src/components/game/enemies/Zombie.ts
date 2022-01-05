import Phaser from 'phaser';
import Person from '../person/Person';
import ZombieHealthBar from '../ui-kit/health-bars/ZombieHealthBar';

export default class Zombie extends Phaser.Physics.Arcade.Sprite {
  static speed = 50;

  private _damage: number;

  public hp: ZombieHealthBar;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this._damage = 10;
    this.hp = new ZombieHealthBar(scene, this.x, this.y, this);
  }

  create(): void {
    this.setTexture('zombie');
    this.update();
  }

  get damage() {
    return this._damage;
  }

  update(): void {
    this.hp.update();
  }

  movingToPerson(person: Person, scene: Phaser.Scene) {
    if (person.isDead) {
      scene.physics.moveToObject(this, person, 0);
      this.anims.play('stay', true);
      return;
    }

    if (
      Phaser.Math.Distance.BetweenPoints(this, person) < 200 &&
      Phaser.Math.Distance.BetweenPoints(this, person) > 60
    ) {
      if (this.scene) {
        scene.physics.moveToObject(this, person, Zombie.speed);
        this.setRotation(
          Phaser.Math.Angle.Between(person.x, person.y, this.x, this.y) -
            Math.PI / 2
        );
        this.anims.play('walk', true);
      }
    } else if (Phaser.Math.Distance.BetweenPoints(this, person) < 60) {
      scene.physics.moveToObject(this, person, Zombie.speed);
      this.setRotation(
        Phaser.Math.Angle.Between(person.x, person.y, this.x, this.y) -
          Math.PI / 2
      );
      this.anims.play('kick', true);
    } else {
      scene.physics.moveToObject(this, person, 0);
      this.anims.play('stay', true);
    }
  }

  kill(): void {
    this.hp.destroy();
    this.destroy(true);
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'zombie',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    const sprite = new Zombie(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);
    sprite.setInteractive({
      cursor: 'url(assets/game/cursors/aim.cur), pointer',
    });
    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    sprite.setDisplaySize(80, 80);
    sprite.body.setSize(45, 45);

    return sprite;
  }
);
