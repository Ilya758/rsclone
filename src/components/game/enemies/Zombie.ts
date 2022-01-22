import Phaser from 'phaser';
import { ZOMBIES } from '../../../constants/zombies';
import ZombieHealthBar from '../ui-kit/health-bars/ZombieHealthBar';
import Enemy from './abstract/Enemy';
import { IZombieChars } from './zombie.types';

export default class Zombie extends Enemy {
  protected _speed: number;

  protected _damage: number;

  protected _hp: number;

  public hpBar: ZombieHealthBar;

  constructor(scene: Phaser.Scene, x: number, y: number, typeOfZombie: string) {
    super(scene, x, y, typeOfZombie);
    this._hp = ZOMBIES[typeOfZombie as keyof IZombieChars].hp;
    this._speed = ZOMBIES[typeOfZombie as keyof IZombieChars].speed / 2;
    this._damage = ZOMBIES[typeOfZombie as keyof IZombieChars].damage;
    this.hpBar = new ZombieHealthBar(scene, this.x, this.y, this, this.hp);
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'zombie',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string
  ) {
    const sprite = new Zombie(this.scene, x, y, texture);
    sprite.depth = 2;

    this.displayList.add(sprite);
    this.updateList.add(sprite);
    sprite.setInteractive({
      cursor: 'url(assets/game/cursors/aim.cur), pointer',
    });
    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );
    sprite.setScale(0.5, 0.5);
    sprite.body.setSize(50, 50);
    sprite.setOffset(15, 15);
    return sprite;
  }
);
