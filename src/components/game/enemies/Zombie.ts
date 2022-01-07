import Phaser from 'phaser';
import ZombieHealthBar from '../ui-kit/health-bars/ZombieHealthBar';
import Enemy from './abstract/Enemy';

export default class Zombie extends Enemy {
  protected _speed: number;

  protected _damage: number;

  protected _hp: number;

  public hpBar: ZombieHealthBar;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this._hp = 150;
    this._speed = 50;
    this._damage = 10;
    this.hpBar = new ZombieHealthBar(scene, this.x, this.y, this, this.hp);
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
