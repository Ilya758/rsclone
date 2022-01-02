/* eslint-disable no-dupe-else-if */
import Phaser from 'phaser';
import { createCharacterAnims } from '../anims/PersonAnims';
import Bullet from '../entities/bullet';
import '../person/Person';

export default class Game extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;

  private person: Phaser.Physics.Arcade.Sprite | null;

  private zombie: Phaser.Physics.Arcade.Sprite | null;

  private bullets: Phaser.GameObjects.Group | null;

  private lastFired = 0;

  private isDown = false;

  private mouseX = 0;

  private mouseY = 0;

  private zombieHealth = 100;

  constructor() {
    super('game');
    this.cursors = null;
    this.person = null;
    this.zombie = null;
    this.bullets = null;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    createCharacterAnims(this.anims);
    // create map
    const map = this.make.tilemap({
      key: 'prison',
    });

    // added tilesets
    const tileset = map.addTilesetImage('dungeon');

    // create layer
    map.createLayer('floor', tileset, 0, 0);
    const walls = map.createLayer('walls', tileset, 0, 0);
    const assets = map.createLayer('assets', tileset, 0, 0);

    // create collision

    walls.setCollisionByProperty({ collides: true });
    assets.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.25);
    walls.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 47, 255),
    });

    this.person = this.add.person(240, 240, 'person');
    this.zombie = this.physics.add.sprite(360, 360, 'zombie');

    // this.cameras.main.startFollow(this.person, true);

    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true,
    });

    // add collision between game objects

    this.physics.add.collider(this.zombie, assets);
    this.physics.add.collider(this.zombie, walls);
    this.physics.add.collider(this.person, walls);
    this.physics.add.collider(this.person, assets);
    this.physics.add.collider(this.bullets, walls, () => console.log('wall'));
    this.physics.add.collider(this.bullets, assets, () => console.log('asset'));
    this.physics.add.collider(
      this.bullets,
      this.zombie,
      this.handleBulletCollision.bind(this)
    );

    this.input.on('pointerdown', (pointer: PointerEvent) => {
      this.isDown = true;
      this.mouseX = pointer.x;
      this.mouseY = pointer.y;
    });

    this.input.on('pointermove', (pointer: PointerEvent) => {
      this.mouseX = pointer.x;
      this.mouseY = pointer.y;
    });

    this.input.on('pointerup', () => {
      this.isDown = false;
    });
  }

  private handleBulletCollision(
    _: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    this.zombieHealth -= 10;
    obj2.destroy(true);

    if (!this.zombieHealth) {
      this.zombie?.destroy(true);
    }
  }

  update(time: number): void {
    if (this.zombie === null || this.person === null) {
      throw new Error();
    }

    if (!this.zombie?.scene) {
      this.zombie = this.physics.add.sprite(
        Math.random() * 480,
        Math.random() * 480,
        'zombie'
      );

      this.zombieHealth = 100;

      if (this.bullets === null) {
        throw new Error('No bullets');
      }

      this.physics.add.collider(
        this.bullets,
        this.zombie,
        this.handleBulletCollision.bind(this)
      );
    }

    if (this.person) {
      this.person.update(this.cursors);
    }

    if (!this.cursors || !this.person) {
      return;
    }

    if (this.isDown && time > this.lastFired) {
      const bullet = this.bullets?.get() as Bullet;

      if (bullet) {
        bullet.callFireMethod(
          this.mouseX,
          this.mouseY,
          this.person.x,
          this.person.y
        );

        this.lastFired = time + 100;
      }
    }

    this.person.setRotation(
      Phaser.Math.Angle.Between(
        this.mouseX,
        this.mouseY,
        this.person.x,
        this.person.y
      ) -
        Math.PI / 2
    );

    if (
      Phaser.Math.Distance.BetweenPoints(this.zombie, this.person) < 10000 &&
      Phaser.Math.Distance.BetweenPoints(this.zombie, this.person) > 25
    ) {
      if (this.zombie.scene) {
        this.physics.moveToObject(this.zombie, this.person, 70);
      }
    } else {
      this.physics.moveToObject(this.zombie, this.person, 0);
    }
  }
}
