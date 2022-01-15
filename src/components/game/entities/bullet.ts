import Phaser from 'phaser';
import Enemy from '../enemies/abstract/Enemy';

export default class Bullet extends Phaser.Physics.Arcade.Image {
  private incX = 0;

  private incY = 0;

  private lifespan = 0;

  private speed = 1000;
  
  private _damage = 10;

  private fire(x: number, y: number, personX: number, personY: number) {
    this.setTexture('bullet');
    this.setScale(0.25, 0.25);
    this.body.setSize(this.width, this.height);
    this.setActive(true);
    this.setVisible(true);
    const angle = Phaser.Math.Angle.Between(x, y, personX, personY);
    this.setRotation(angle - Math.PI);

    // calculate delta coords of the bullet

    const xA = -25 * Math.cos(angle) + 10 * Math.sin(angle) + personX;
    const yA = -25 * Math.sin(angle) - 10 * Math.cos(angle) + personY;

    // set initial position of the bullet

    this.setPosition(xA, yA);

    this.incX = Math.cos(angle);
    this.incY = Math.sin(angle);
    this.setVelocity(
      -this.incX * this.speed + Math.random() * 100 - 50,
      -this.incY * this.speed + Math.random() * 100 - 50
    );
    this.lifespan = 1000;
  }

  public callFireMethod(
    x: number,
    y: number,
    personX: number,
    personY: number
  ) {
    return this.fire(x, y, personX, personY);
  }

  static handleBulletAndEnemyCollision(
    obj: Phaser.GameObjects.GameObject,
    bullet: Phaser.GameObjects.GameObject
  ) {
    const enemy = obj as Enemy;
    enemy.setTint(0xff0000);
    enemy.hpBar.decrease(30);
    bullet.destroy(true);

    obj.scene.time.addEvent({
      delay: 150,
      callback: () => {
        enemy.clearTint();
      },
    });

    if (!enemy.hpBar.value) {
      enemy.isDead = true;
      enemy.kill();
    }
  }

  static handleBulletAndWallsCollision(bullet: Phaser.GameObjects.GameObject) {
    bullet.destroy();
  }
  
  get damage() {
    return this._damage
  }

  update(_: number, delta: number) {
    this.lifespan -= delta;

    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
