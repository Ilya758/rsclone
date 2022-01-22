import { ATLASES } from './../../../constants/atlases';
import Phaser from 'phaser';
import { createUserKeys } from '../../../utils/createUserKeys';
import { createCharacterAnims } from '../anims/PersonAnims';
import { createZombieAnims } from '../anims/ZombieAnims';
import Zombie from '../enemies/Zombie';
import Bullet from '../entities/bullet';
import '../person/Person';
import '../enemies/Zombie';
import '../enemies/HandBoss';
import '../enemies/ClawBoss';
import '../enemies/MegaBoss';
import Person from '../person/Person';
import EventFactory from '../events/eventFactory';
// import debugGraphicsDraw from '../../../utils/debug';
import { ZOMBIES } from '../../../constants/zombies';
import {
  PERSON_COORDINATES,
  ZOMBIE_COORDINATES,
} from '../../../constants/coordinates';
import plotHandle from '../plot/plotHandle';
import { IWall } from './dungeon.types';
import { IMAGES } from '../../../constants/images';

export default class Dungeon extends Phaser.Scene {
  protected person: Person | null;

  private bullets: Phaser.GameObjects.Group | null;

  private personWalkSound: Phaser.Sound.BaseSound | null;

  private personRifleSound: Phaser.Sound.BaseSound | null;

  private zombies: Phaser.Physics.Arcade.Group | null;

  private tmpEnemyCount = 10;

  private points: Phaser.Physics.Arcade.StaticGroup | null;

  private walls: IWall | [null];

  constructor() {
    super('dungeon');
    this.person = null;
    this.zombies = null;
    this.bullets = null;
    this.points = null;
    this.personWalkSound = this.personRifleSound = null;
    this.walls = Array(2).fill(null) as [null];
  }

  preload() {
    IMAGES.forEach(img => {
      this.load.image(img.name, img.url);
    });
    ATLASES.forEach(atlas => {
      this.load.atlas(atlas.name, atlas.urlPNG, atlas.urlJSON);
    });
    this.load.tilemapTiledJSON('main', './assets/game/map/main.json');
    this.load.audio('person-walk', './assets/audio/person-walk.mp3');
    this.load.audio('rifle-shot', './assets/audio/rifle-shot.mp3');
  }

  create() {
    this.points = this.physics.add.staticGroup();
    this.input.setDefaultCursor('url(assets/game/cursors/cursor.cur), pointer');
    createCharacterAnims(this.anims);
    createZombieAnims(this.anims, 'zombie');
    // create map

    const map = this.make.tilemap({
      key: 'main',
    });

    // added tilesets

    const tileset = map.addTilesetImage('floor');
    const tilesetWalls = map.addTilesetImage('walls');
    const tilesetOther2 = map.addTilesetImage('other2');
    const tilesetFurniture = map.addTilesetImage('furniture');
    const tilesetRoof = map.addTilesetImage('roof2');

    // create layer

    const floor = map.createLayer(
      'floor',
      [tileset, tilesetWalls, tilesetFurniture],
      0,
      0
    );

    const roof = map.createLayer('roof', tilesetRoof, 0, 0);
    roof.depth = 10;
    const roof0 = map.createLayer('roofQuest0', tilesetRoof, 0, 0);
    roof0.depth = 10;
    const roof1 = map.createLayer('roofQuest1', tilesetRoof, 0, 0);
    roof1.depth = 10;
    const roof2 = map.createLayer('roofQuest2', tilesetRoof, 0, 0);
    roof2.depth = 10;
    const roof3 = map.createLayer('roofQuest3', tilesetRoof, 0, 0);
    roof3.depth = 10;
    const floor2 = map.createLayer(
      'floor2',
      [tileset, tilesetWalls, tilesetFurniture],
      0,
      0
    );
    if (!this.points) {
      throw new Error('Not found');
    }

    const checkPoints = map.getObjectLayer('CheckPoints');
    checkPoints.objects.forEach(point => {
      this.points?.get(point.x, point.y, point.name);
    });

    map.createLayer('shadows', tilesetOther2, 0, 0);

    this.walls = {
      0: map.createLayer(
        'walls',
        [tileset, tilesetWalls, tilesetOther2, tilesetFurniture],
        0,
        0
      ),
      1: map.createLayer(
        'walls2',
        [tilesetWalls, tilesetFurniture, tilesetOther2],
        0,
        0
      ),
    };

    // create collision

    floor.setCollisionByProperty({ collides: true });
    floor2.setCollisionByProperty({ collides: true });

    Object.values(this.walls).forEach(wall => {
      (wall as Phaser.Tilemaps.TilemapLayer).setCollisionByProperty({
        collides: true,
      });
    });

    // debugGraphicsDraw(walls, this);
    // debugGraphicsDraw(walls2, this);

    // person and enemies initialization

    this.person = this.add.person(
      PERSON_COORDINATES.start[0],
      PERSON_COORDINATES.start[1],
      'person'
    );
    this.person.depth = 2;

    this.points.setVisible(false);
    this.points.children.entries.forEach((el, ind) => {
      if (!this.person) {
        throw new Error('Not found');
      }
      this.physics.add.overlap(this.person, el, () => {
        plotHandle(checkPoints.objects[ind].name);
        el.destroy(true);
      });
    });

    this.cameras.main.startFollow(this.person, true);

    // creating the sounds

    this.personWalkSound = this.sound.add('person-walk', {
      volume: 0.5,
    });

    this.personRifleSound = this.sound.add('rifle-shot', {
      volume: 0.8,
      loop: true,
    });

    // TODO: creating bullets need to be generalized or smth the same

    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true,
    });

    // add collision between game objects

    this.physics.add.collider(this.person, [
      this.walls[0],
      this.walls[1],
      floor2,
    ]);

    this.physics.add.collider(
      this.bullets,
      this.walls[0],
      Bullet.handleBulletAndWallsCollision.bind(this)
    );

    (this.person as Person).createRotationAndAttacking(
      this,
      this.personRifleSound
    );

    new EventFactory(
      this,
      this.person,
      [roof0, roof1, roof2, roof3],
      this.person.userInterface
    );

    // appending scene PersonUI

    this.scene.add('person-ui', this.person.userInterface);
    this.scene.run('person-ui');

    this.createGroupOfZombies(3);
  }

  createGroupOfZombies(ndx: number) {
    if (!this.person && !this.bullets) {
      throw new Error('Not found');
    }

    this.zombies = this.physics.add.group({
      classType: Zombie,
      maxSize: this.tmpEnemyCount,
    });

    // function getCoord() {
    //   return 500 + Math.random() * 300;
    // }
    for (let i = 0; i < ZOMBIE_COORDINATES[ndx].length; i += 1) {
      const texture = Object.keys(ZOMBIES)[Math.floor(Math.random() * 5)];
      const zombie = this.add.zombie(
        ZOMBIE_COORDINATES[ndx][i][0],
        ZOMBIE_COORDINATES[ndx][i][1],
        texture
      );

      createZombieAnims(zombie.anims, texture);

      this.zombies.add(zombie);

      this.physics.add.collider(
        this.bullets as Phaser.GameObjects.Group,
        zombie,
        Bullet.handleBulletAndEnemyCollision.bind(this)
      );

      Object.values(this.walls).forEach(wall => {
        this.physics.add.collider(zombie, wall as Phaser.Tilemaps.TilemapLayer);
      });

      this.physics.add.collider(
        zombie,
        this.person as Phaser.Physics.Arcade.Sprite,
        () =>
          (this.person as Person).handleEnemyDamage(
            zombie,
            this.person as Person,
            this
          )
      );
    }

    this.setCollisionBetweenZombies();

    this.tmpEnemyCount += 1;
  }

  setCollisionBetweenZombies() {
    const zombieArray = this.zombies?.children
      .entries as Phaser.GameObjects.GameObject[];

    for (let i = 0; i < zombieArray.length; i += 1) {
      for (let j = 0; j <= zombieArray.length; j += 1) {
        this.physics.add.collider(zombieArray[i], zombieArray[j]);
      }
    }
  }

  update(time?: number): void {
    if (!this.zombies?.children.entries.length) {
      // this.createGroupOfZombies();
    }

    Array.from(this.zombies?.children.entries as Zombie[]).forEach(zombie => {
      zombie.update();
      zombie.movingToPerson(this.person as Person, this);
    });

    if (this.person === null) {
      throw new Error();
    }

    if (this.person) {
      this.person.update(
        createUserKeys(this.input),
        time as number,
        this.bullets,
        this.personWalkSound as Phaser.Sound.BaseSound,
        this.person.userInterface
      );
    }
  }
}
