/* eslint-disable no-dupe-else-if */
import Phaser from 'phaser';
import Bullet from '../entities/bullet';

export default class Game extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;

  private person: Phaser.Physics.Arcade.Sprite | null;

  private zombie: Phaser.Physics.Arcade.Sprite | null;

  static target = new Phaser.Math.Vector2();

  private bullets: Phaser.GameObjects.Group | null;

  private lastFired = 0;

  private isDown = false;

  private mouseX = 0;

  private mouseY = 0;

  private zombieHealth = 100;

  constructor() {
    super('game');
    this.cursors = null;
    this.cursors = null;
    this.person = null;
    this.zombie = null;
    this.bullets = null;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
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

    this.person = this.physics.add.sprite(240, 240, 'person');

    this.zombie = this.physics.add.sprite(360, 360, 'zombie');

    this.anims.create({
      key: 'left',
      frames: [{ key: 'person', frame: 'Human_5_Idle0.png' }],
    });
    this.anims.create({
      key: 'right',
      frames: [{ key: 'person', frame: 'Human_1_Idle0.png' }],
    });
    this.anims.create({
      key: 'up',
      frames: [{ key: 'person', frame: 'Human_7_Idle0.png' }],
    });
    this.anims.create({
      key: 'down',
      frames: [{ key: 'person', frame: 'Human_3_Idle0.png' }],
    });

    this.input.on('pointermove', (pointer: PointerEvent) => {
      Game.target.x = pointer.x;
      Game.target.y = pointer.y;
    });

    // following sprite for user-pointer
    this.input.on('pointermove', (pointer: PointerEvent) => {
      Game.target.x = pointer.x;
      Game.target.y = pointer.y;
    });

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

    const speed = 100;

    if (this.cursors.left.isDown) {
      // left
      this.person.anims.play('left');
      this.person.setVelocity(-speed, 0);
      this.person.setRotation(
        Phaser.Math.Angle.Between(
          Game.target.x,
          Game.target.y,
          this.person.x,
          this.person.y
        ) -
          Math.PI / 2
      );
    } else if (this.cursors.right.isDown) {
      // right
      this.person.anims.play('right');
      this.person.setVelocity(+speed, 0);
      // this.person.angle = 90;
      this.person.setRotation(
        Phaser.Math.Angle.Between(
          Game.target.x,
          Game.target.y,
          this.person.x,
          this.person.y
        ) -
          Math.PI / 2
      );
    } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
      this.person.anims.play('up');
      this.person.setVelocity(-speed);
      this.person.setRotation(
        Phaser.Math.Angle.Between(
          Game.target.x,
          Game.target.y,
          this.person.x,
          this.person.y
        ) -
          Math.PI / 2
      );
    } else if (this.cursors.up.isDown) {
      // up
      this.person.anims.play('up');
      this.person.setVelocity(0, -speed);
      this.person.setRotation(
        Phaser.Math.Angle.Between(
          Game.target.x,
          Game.target.y,
          this.person.x,
          this.person.y
        ) -
          Math.PI / 2
      );
      // this.person.angle = -180;
    } else if (this.cursors.down.isDown) {
      // down
      this.person.anims.play('down');
      this.person.setVelocity(0, +speed);
      // this.person.angle = 180;
      this.person.setRotation(
        Phaser.Math.Angle.Between(
          Game.target.x,
          Game.target.y,
          this.person.x,
          this.person.y
        ) -
          Math.PI / 2
      );
    } else {
      // stand position
      this.person.anims.play('right');
      this.person.setVelocity(0, 0);
      // this.person.angle = 0;
      this.person.setRotation(
        Phaser.Math.Angle.Between(
          Game.target.x,
          Game.target.y,
          this.person.x,
          this.person.y
        ) -
          Math.PI / 2
      );
    }

    if (this.zombie === null) {
      throw new Error();
    }

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
