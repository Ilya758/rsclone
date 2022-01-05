import Phaser from 'phaser';
import Person from '../../person/Person';
import HealthBar from './HealthBar';

export default class PersonHealthBar extends HealthBar {
  protected maxHealth: number;

  protected _value: number;

  protected barWidth = 200;

  protected barHeight = 10;

  public x = 150;

  public y = 15;

  constructor(scene: Phaser.Scene, x: number, y: number, object: Person) {
    super(scene, x, y, object);
    this.maxHealth = this._value = 100;
    super.draw();
  }

  appendToScene(): void {
    super.appendToScene();
    this.bar.setScrollFactor(0);
  }

  draw() {
    super.draw();
  }
}
