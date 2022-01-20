import Phaser from 'phaser';

export default abstract class HealthBar {
  protected abstract barWidth: number;

  protected abstract barHeight: number;

  protected abstract maxHealth: number;

  public x: number;

  public y: number;

  protected bar: Phaser.GameObjects.Graphics;

  protected scene: Phaser.Scene;

  private object?: Phaser.Physics.Arcade.Sprite;

  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    object?: Phaser.Physics.Arcade.Sprite
  ) {
    this.x = x || 0;
    this.y = y || 0;
    this.object = object;
    this.scene = scene;
    this.bar = new Phaser.GameObjects.Graphics(this.scene);
    this.appendToScene();
    this.bar.depth = 20;
  }

  appendToScene() {
    this.scene.add.existing(this.bar);
  }

  draw(hp: number) {
    // clearing bar

    this.bar.clear();

    // background border

    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, this.barWidth, this.barHeight);

    // health fill

    if (hp <= 0.3 * this.maxHealth) {
      // when the health state is low
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x00ff00);
    }

    // using delta to fill bar with a current percentage of health
    const delta = Math.floor(
      (this.barWidth * hp) / this.maxHealth - (4 * hp) / this.maxHealth
    );

    this.bar.fillRect(this.x + 2, this.y + 2, delta, this.barHeight - 4);
    this.bar.depth = 20;
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
