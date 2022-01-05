/* eslint-disable no-dupe-else-if */
import Phaser, { Scene } from 'phaser';
import { createUserKeys } from '../../../utils/createUserKeys';
import { createCharacterAnims } from '../anims/PersonAnims';
import { createZombieAnims } from '../anims/ZombieAnims';
import Zombie from '../enemies/Zombie';
import Bullet from '../entities/bullet';
import '../person/Person';
import '../enemies/Zombie';
import Person from '../person/Person';
import PersonUI from '../ui-kit/PersonUi';

export default class Game extends Phaser.Scene {
  private personUi: PersonUI | null;

  private person: Phaser.Physics.Arcade.Sprite | null | Person;

  private zombie: Phaser.Physics.Arcade.Sprite | null;

  private bullets: Phaser.GameObjects.Group | null;

  constructor() {
    super('game');
    this.person = null;
    this.zombie = null;
    this.bullets = null;
    this.personUi = null;
  }

  create() {
    createCharacterAnims(this.anims);
    createZombieAnims(this.anims);

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

    // person and enemies initialization

    this.person = this.add.person(240, 240, 'person');
    this.zombie = this.add.zombie(360, 360, 'zombie');

    this.cameras.main.startFollow(this.person, true);

    // TODO: creating bullets need to be generalized or smth the same

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

    (this.person as Person).createRotationAndAttacking(this);

    // appending scene PersonUI

    this.personUi = new PersonUI(this, this.person as Person);
    this.scene.add('person-ui', this.personUi as unknown as Scene);
    this.physics.add.collider(
      this.zombie,
      this.person,
      (this.person as Person).handleEnemyDamage.bind(
        this,
        this.zombie,
        this.person,
        this,
        this.personUi
      )
    );
  }

  private handleBulletCollision(
    _: Phaser.GameObjects.GameObject,
    bullet: Phaser.GameObjects.GameObject
  ) {
    const zombie = _ as Zombie;
    zombie.hp.decrease(10);
    bullet.destroy(true);

    if (!zombie.hp.value) {
      zombie.kill();
    }
  }

  update(time: number): void {
    if (!this.personUi) {
      throw new Error("PersonUI isn't found");
    }

    this.personUi?.selfHealing(this);
    this.zombie?.update();

    if (this.zombie === null || this.person === null) {
      throw new Error();
    }

    if (!this.zombie?.scene) {
      this.zombie = this.add.zombie(
        Math.random() * 480,
        Math.random() * 480,
        'zombie'
      );

      this.physics.add.collider(
        this.zombie,
        this.person,
        (this.person as Person).handleEnemyDamage.bind(
          this,
          this.zombie,
          this.person,
          this,
          this.personUi
        )
      );

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
      this.person.update(createUserKeys(this.input), time, this.bullets);
    }

    (this.zombie as Zombie).movingToPerson(this.person as Person, this);
  }
}
