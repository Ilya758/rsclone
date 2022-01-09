import Phaser from 'phaser';
import Person from '../../person/Person';

export default abstract class HealthBar {
  protected abstract barWidth: number;

  protected abstract barHeight: number;

  protected abstract maxHealth: number;

  protected abstract _value: number;

  public x: number;

  public y: number;

  protected bar: Phaser.GameObjects.Graphics;

  protected scene: Phaser.Scene;

  private object?: Phaser.Physics.Arcade.Sprite;

  public isHealing = false;

  private timeHealingTimer: Phaser.Time.TimerEvent;

  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    object?: Phaser.Physics.Arcade.Sprite
  ) {
    this.timeHealingTimer = scene.time.addEvent({});
    this.x = x || 0;
    this.y = y || 0;
    this.object = object;
    this.scene = scene;
    this.bar = new Phaser.GameObjects.Graphics(this.scene);
    this.appendToScene();
  }

  appendToScene() {
    this.scene.add.existing(this.bar);
  }

  decrease(amount: number) {
    this._value -= amount; // every damage decreases hp

    if (this._value < 0) {
      this._value = 0; // character is dead
    }

    this.draw();

    return this._value === 0;
  }

  heal(scene: Phaser.Scene, amount: number) {
    const person = this.object as Person;

    if (!person.hit && !person.isDead) {
      // when the person is in the cooldown

      if (this.value !== this.maxHealth && this.isHealing) {
        // he starts to healing
        this.isHealing = false;

        this.timeHealingTimer = scene.time.addEvent({
          // after 30 seconds, health increases for 10 pts
          delay: 30000,
          callback: () => {
            this._value += amount;

            if (this._value > this.maxHealth) {
              this._value = this.maxHealth;
            }

            this.draw();

            this.isHealing = true;

            return this._value === this.maxHealth;
          },
        });

        this.isHealing = false;
      }
    } else {
      // otherwise time-healing-timer is removing

      this.timeHealingTimer.remove();
    }
  }

  draw() {
    // clearing bar

    this.bar.clear();

    // background border

    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, this.barWidth, this.barHeight);

    // health fill

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(
      this.x + 2,
      this.y + 2,
      this.barWidth - 4,
      this.barHeight - 4
    );

    if (this.value <= 0.3 * this.maxHealth) {
      // when the health state is low
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x00ff00);
    }

    // using delta to fill bar with a current percentage of health
    const delta = Math.floor(
      (this.barWidth * this.value) / this.maxHealth -
        (4 * this.value) / this.maxHealth
    );

    this.bar.fillRect(this.x + 2, this.y + 2, delta, this.barHeight - 4);
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
  }

  update() {
    if (this.object) {
      // if the object-variable is existed, then position of the bar relates with a character

      this.bar.y = this.object.y - this.y - 30;
      this.bar.x = this.object.x - this.x - 18;
    }
  }

  destroy() {
    //when a character is dying, the health bar will be destroyed

    this.bar.destroy(true);
  }
}
