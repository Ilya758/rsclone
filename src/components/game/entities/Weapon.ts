import Phaser from 'phaser';
import { CLIP_AMMO_SIZE } from '../../../constants/clipAmmoSize';
import { TWeapon } from '../../../types/globals';
import Enemy from '../enemies/abstract/Enemy';
import sceneEvents from '../events/eventCenter';
import Person from '../person/Person';
import Dungeon from '../scenes/Dungeon';
import { IEnemySounds } from '../scenes/dungeon.types';
import UIPanel from '../ui-kit/UiPanel';

export default class Weapon extends Phaser.Physics.Arcade.Image {
  private incX = 0;

  private incY = 0;

  private lifespan = 0;

  private static speed = 1000;

  private static _fireRate = 550;

  private static _damage = 25;

  private static _currentWeapon = 'pistol';

  public static isRealoaded = false;

  public static currentAmmo = {
    pistol: 10,
    rifle: 30,
    shotgun: 7,
    sniper: 1,
    flamethrower: 500,
  };

  static get currentWeapon() {
    return Weapon._currentWeapon;
  }

  static set currentWeapon(type: string) {
    Weapon._currentWeapon = type;

    switch (type) {
      case 'pistol': {
        Weapon.setWeaponChars(25, 500, 1300);
        break;
      }

      case 'rifle': {
        Weapon.setWeaponChars(15, 100, 1000);
        break;
      }

      case 'shotgun': {
        Weapon.setWeaponChars(60, 1800, 1300);
        break;
      }

      case 'sniper': {
        Weapon.setWeaponChars(100, 1750, 2000);
        break;
      }

      case 'flamethrower': {
        Weapon.setWeaponChars(10, 10, 100);
        break;
      }
    }
  }

  static setWeaponChars(damage: number, fireRate: number, speed: number) {
    Weapon._damage = damage;
    Weapon._fireRate = fireRate;
    Weapon.speed = speed;
    sceneEvents.emit('switch-weapon');
  }

  static get fireRate() {
    return Weapon._fireRate;
  }

  static set fireRate(value: number) {
    Weapon._fireRate = value;
  }

  private fire(x: number, y: number, personX: number, personY: number) {
    const setBulletChars = (scale: number, alpha: number, texture: string) => {
      this.setScale(scale).setAlpha(alpha).setTexture(texture);
    };

    if (Weapon.currentWeapon === 'flamethrower') {
      setBulletChars(0.6, 0.6, 'fire');
    } else if (Weapon.currentWeapon === 'shotgun') {
      setBulletChars(0.6, 0.6, 'bullet-shotgun');
    } else {
      setBulletChars(0.25, 1, 'bullet');
    }

    this.body.setSize(this.width, this.height);
    this.setActive(true);
    const angle = Phaser.Math.Angle.Between(x, y, personX, personY);
    this.setRotation(angle - Math.PI);

    const xA = -25 * Math.cos(angle) + 10 * Math.sin(angle) + personX;
    const yA = -25 * Math.sin(angle) - 10 * Math.cos(angle) + personY;

    this.setPosition(xA, yA);

    this.incX = Math.cos(angle);
    this.incY = Math.sin(angle);
    this.setVelocity(
      -this.incX * Weapon.speed + Math.random() * 100 - 50,
      -this.incY * Weapon.speed + Math.random() * 100 - 50
    );
    this.lifespan = 1000;

    const currentWeapon =
      Weapon.currentWeapon as keyof typeof Weapon.currentAmmo;
    const currentWeaponAmmo = Weapon.currentAmmo[currentWeapon];
    Weapon.currentAmmo[currentWeapon] -= 1;
    UIPanel.currentAmmo = Weapon.currentAmmo[currentWeapon];

    if (currentWeaponAmmo < 2) {
      Weapon.reload(currentWeapon, this.scene);
    }

    sceneEvents.emit('changeCurrentAmmo');
  }

  static reload(currentWeapon: TWeapon, scene: Phaser.Scene) {
    const currentAmmo = Weapon.currentAmmo[currentWeapon];
    Weapon.currentAmmo[currentWeapon] = CLIP_AMMO_SIZE[currentWeapon];
    UIPanel.currentAmmo = Weapon.currentAmmo[currentWeapon];
    Weapon.isRealoaded = true;
    Person.pointerIsDown = false;

    const sound = (scene as Dungeon).weaponSoundsShot[
      currentWeapon
    ] as Phaser.Sound.BaseSound;
    let delay = sound.duration * 500;

    if (currentWeapon === 'rifle') {
      delay = 100;
    } else if (currentWeapon === 'pistol') {
      delay = 500;
    }
    scene.time.addEvent({
      delay: delay,
      callback: () => {
        sound?.stop();
      },
    });

    const currentReloadSound = (scene as Dungeon).weaponSoundsReload[
      currentWeapon
    ] as Phaser.Sound.BaseSound;

    if (currentWeapon === 'shotgun') {
      const duration =
        (currentReloadSound.duration * 1000 * (7 - currentAmmo)) / 7;

      currentReloadSound.play();

      scene.time.addEvent({
        delay: duration,
        callback: () => {
          currentReloadSound.stop();
          Weapon.isRealoaded = false;
        },
      });
    } else {
      currentReloadSound?.play();

      scene.time.addEvent({
        delay: currentReloadSound.duration * 1000,
        callback: () => {
          Weapon.isRealoaded = false;
        },
      });
    }
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
    bullets: Phaser.GameObjects.GameObject[],
    enemySounds: IEnemySounds
  ) {
    const firstBullet = bullets[0] as Weapon;

    const enemy = obj as Enemy;
    enemy.isShooted.state = true;

    if (enemySounds.aggressive.isPlaying) {
      enemySounds.hit.stop();
    }

    if (!enemySounds.aggressive.isPlaying && !enemySounds.hit.isPlaying) {
      enemySounds.hit.play();
    }

    enemy.setTint(0xff0000);
    enemy.decreaseHp(Weapon.damage);
    firstBullet.destroy(true);

    obj.scene.time.addEvent({
      delay: 150,
      callback: () => {
        enemy.clearTint();
      },
    });

    if (!enemy.hp) {
      enemySounds.hit.stop();
      enemySounds.dead.play();
      enemy.kill();
      enemy.isDead = true;
    }
  }

  static handleBulletAndWallsCollision(bullet: Phaser.GameObjects.GameObject) {
    bullet.destroy();
  }

  static get damage() {
    return Weapon._damage;
  }

  set damage(value: number) {
    Weapon._damage = value;
  }

  update(_: number, delta: number) {
    this.lifespan -= delta;

    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
