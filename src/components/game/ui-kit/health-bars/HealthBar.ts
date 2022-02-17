import Phaser from 'phaser';

export default abstract class HealthBar {
  protected abstract barWidth: number;

  protected abstract barHeight: number;

  protected abstract maxHealth: number;

  public x: number;

  public y: number;

  protected bar: Phaser.GameObjects.Graphics;

  protected scene: Phaser.Scene;

  private person?: Phaser.Physics.Arcade.Sprite;

  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    person?: Phaser.Physics.Arcade.Sprite
  ) {
    this.x = x || 0;
    this.y = y || 0;
    this.person = person;
    this.scene = scene;
    this.bar = new Phaser.GameObjects.Graphics(this.scene);
    this.appendToScene();
    this.bar.depth = 20;
  }

  appendToScene() {
    this.scene.add.existing(this.bar);
  }

  draw(hp: number) {
    this.bar.clear();
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, this.barWidth, this.barHeight);

    if (hp <= 0.3 * this.maxHealth) {
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x00ff00);
    }

    const delta = Math.floor(
      (this.barWidth * hp) / this.maxHealth - (4 * hp) / this.maxHealth
    );

    this.bar.fillRect(this.x + 2, this.y + 2, delta, this.barHeight - 4);
    this.bar.depth = 20;
  }

  update() {
    if (this.person) {
      this.bar.x = this.person.x - this.x - 18;
      this.bar.y = this.person.y - this.y - 30;
    }
  }

  destroy() {
    this.bar.destroy(true);
  }
}
