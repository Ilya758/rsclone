import Phaser from 'phaser';
import Person from '../../person/Person';
import { TUnionHealthBar } from './enemy.types';

export default abstract class Enemy extends Phaser.Physics.Arcade.Sprite {
  protected abstract _speed: number;

  protected abstract _damage: number;

  protected abstract _hp: number;

  public abstract hpBar: TUnionHealthBar;

  get damage() {
    return this._damage;
  }

  get speed() {
    return this._speed;
  }

  get hp() {
    return this._hp;
  }

  update(): void {
    this.hpBar.update();
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
        scene.physics.moveToObject(this, person, this.speed);
        this.setRotation(
          Phaser.Math.Angle.Between(person.x, person.y, this.x, this.y) +
            Math.PI / 2
        );
        this.anims.play('walk', true);
      }
    } else if (Phaser.Math.Distance.BetweenPoints(this, person) < 60) {
      scene.physics.moveToObject(this, person, this.speed);
      this.setRotation(
        Phaser.Math.Angle.Between(person.x, person.y, this.x, this.y) +
          Math.PI / 2
      );
      this.anims.play('kick', true);
    } else {
      scene.physics.moveToObject(this, person, 0);
      this.anims.play('stay', true);
    }
  }

  kill(): void {
    this.hpBar.destroy();
    this.destroy(true);
  }
}
