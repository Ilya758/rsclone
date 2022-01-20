import Phaser from 'phaser';
import HealthBar from './HealthBar';

export default class ZombieHealthBar extends HealthBar {
  protected maxHealth: number;

  protected barWidth = 34;

  protected barHeight = 10;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    object: Phaser.Physics.Arcade.Sprite,
    hp: number
  ) {
    super(scene, x, y, object);
    this.maxHealth = hp;
    super.draw(this.maxHealth);
  }
}
