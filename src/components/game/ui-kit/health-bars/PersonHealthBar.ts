import Phaser from 'phaser';
import Person from '../../person/Person';
import HealthBar from './HealthBar';

export default class PersonHealthBar extends HealthBar {
  protected maxHealth: number;

  protected _value: number;

  protected barWidth = 49;

  protected barHeight = 49;

  public x = 46;

  public y = 16;

  constructor(scene: Phaser.Scene, x: number, y: number, object: Person) {
    super(scene, x, y, object);
    this.maxHealth = this._value = 100;
    super.draw();
  }

  appendToScene(): void {
    super.appendToScene();
    this.bar.alpha = 0.35;
    this.bar.setScrollFactor(0);
  }

  draw() {
    super.draw();
  }
}
