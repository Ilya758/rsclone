import Phaser from 'phaser';
import HealthBar from './HealthBar';

export default class ZombieHealthBar extends HealthBar {
  protected maxHealth: number;

  protected _value: number;

  protected barWidth = 34;

  protected barHeight = 10;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    object: Phaser.Physics.Arcade.Sprite
  ) {
    super(scene, x, y, object);
    this.maxHealth = this._value = 100;
    super.draw();
  }
}
