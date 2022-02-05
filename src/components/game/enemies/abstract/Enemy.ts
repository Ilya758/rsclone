import Phaser from 'phaser';
import sceneEvents from '../../events/eventCenter';
import Person from '../../person/Person';
import { IEnemySounds } from '../../scenes/dungeon.types';
import { TUnionHealthBar } from './enemy.types';

export default abstract class Enemy extends Phaser.Physics.Arcade.Sprite {
  protected abstract _speed: number;

  protected abstract _damage: number;

  protected abstract _hp: number;

  public abstract hpBar: TUnionHealthBar;

  public isDead = false;

  public isShooted = {
    state: false,
    once: false,
  };

  get damage() {
    return this._damage;
  }

  set damage(value) {
    this._damage = value;
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    this._speed = value;
  }

  get hp() {
    return this._hp;
  }

  set hp(value: number) {
    this._hp = value;
  }

  decreaseHp(amount: number) {
    this.hp -= amount; // every damage decreases hp

    if (this.hp < 0) {
      this.hp = 0; // character is dead
    }

    this.hpBar.draw(this.hp);

    return this.hp === 0;
  }

  update(): void {
    this.hpBar.update();
  }

  movingToPerson(
    person: Person,
    scene: Phaser.Scene,
    zombieSounds: IEnemySounds
  ) {
    if (person.isDead) {
      scene.physics.moveToObject(this, person, 0);
      this.anims.play('stay', true);
      return;
    }

    if (
      !this.isDead &&
      Phaser.Math.Distance.BetweenPoints(this, person) < 500
    ) {
      if (!this.isShooted.once && this.isShooted.state) {
        zombieSounds.aggressive.play();
        this.isShooted.once = true;
        this.speed *= 2;
      }

      scene.physics.moveToObject(this, person, this.speed);
      this.setRotation(
        Phaser.Math.Angle.Between(person.x, person.y, this.x, this.y) +
          Math.PI / 2
      );

      if (Phaser.Math.Distance.BetweenPoints(this, person) < 60) {
        this.anims.play('kick', true);
      } else {
        this.anims.play('walk', true);
      }
    } else {
      this.setVelocity(0, 0);
    }
  }

  kill(): void {
    if (!this.isDead) {
      sceneEvents.emit('killZombieEvent');
      sceneEvents.emit('dropItem', [this.x, this.y]);
      this.hpBar.destroy();
      this.anims.play('zombie-death');
      this.disableBody();

      this.scene.time.addEvent({
        delay: 1500,
        callback: () => this.destroy(),
      });
    }
  }

  static createEnemySounds(scene: Phaser.Scene): IEnemySounds {
    return {
      aggressive: scene.sound.add('zombie-aggressive', {
        volume: 0.3,
      }),
      dead: scene.sound.add('zombie-dead', {
        volume: 0.5,
      }),
      hit: scene.sound.add('zombie-hit', {
        volume: 0.3,
      }),
      horde: scene.sound.add('zombie-horde', {
        volume: 0.3,
      }),
    };
  }
}
