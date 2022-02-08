import Phaser from 'phaser';
import ZombieHealthBar from '../ui-kit/health-bars/ZombieHealthBar';
import Enemy from './abstract/Enemy';

export default class MegaBoss extends Enemy {
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
    this._hp = 5000;
    this._speed = 70;
    this._damage = 20;
    this.hpBar = new ZombieHealthBar(scene, this.x, this.y, this, this.hp);
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'megaBoss',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    const sprite = new MegaBoss(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);
    sprite.setInteractive({
      cursor: 'url(assets/game/cursors/aim.cur), pointer',
    });
    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );
    sprite.setScale(0.9);
    sprite.body.setSize(150, 200);
    sprite.setOffset(50, 0);

    return sprite;
  }
);
