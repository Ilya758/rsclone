import Phaser, { Scene } from 'phaser';
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
import PersonUI from '../ui-kit/PersonUi';
import EventFactory from '../events/eventFactory';
// import debugGraphicsDraw from '../../../utils/debug';
import { ZOMBIES } from '../../../constants/zombies';
import { COORDINATES } from '../../../constants/coordinates';
import plotHandle from '../plot/plotHandle';
import sceneEvents from '../events/eventCenter';
import { IWall } from './dungeon.types';
export default class Dungeon extends Phaser.Scene {
  protected personUi: PersonUI | null;

  protected person: Phaser.Physics.Arcade.Sprite | null;

  private zombie: Phaser.Physics.Arcade.Sprite | null;

  private bullets: Phaser.GameObjects.Group | null;

  private personWalkSound: Phaser.Sound.BaseSound | null;

  private personRifleSound: Phaser.Sound.BaseSound | null;

  private zombies: Phaser.Physics.Arcade.Group | null;

  private tmpEnemyCount = 5;

  private points: Phaser.Physics.Arcade.StaticGroup | null;
  private dialogNumber: number;
  private walls: IWall | [null];

  constructor() {
    super('dungeon');
    this.dialogNumber = 0;
    this.person = null;
    this.zombie = null;
    this.zombies = null;
    this.bullets = null;
    this.personUi = null;
    this.points = null;
    this.personWalkSound = this.personRifleSound = null;
    this.walls = Array(2).fill(null) as [null];
  }

  preload() {
    this.load.image('secondIcon', './assets/game/ui/element_0074_Layer-76.png');
    this.load.image('floor', './assets/game/tiles/floor.png');
    this.load.image('iconMan', './assets/game/icons/manicon.png');
    this.load.image('walls', './assets/game/tiles/walls.png');
    this.load.image('roof2', './assets/game/tiles/roof2.png');
    this.load.image('other', './assets/game/tiles/other.png');
    this.load.image('gun', './assets/game/items/gun.png');
    this.load.image('rifle', './assets/game/items/rifle.png');
    this.load.image('bat', './assets/game/items/bat.png');
    this.load.image('firethrower', './assets/game/items/firethrower.png');
    this.load.image('knife', './assets/game/items/knife.png');
    this.load.image('furniture', './assets/game/tiles/furniture.png');
    this.load.image('other2', './assets/game/tiles/other2.png');
    this.load.tilemapTiledJSON('main', './assets/game/map/main.json');
    this.load.atlas(
      'person',
      './assets/game/characters/man.png',
      './assets/game/characters/man.json'
    );
    this.load.atlas(
      'zombie',
      './assets/game/enemies/man1.png',
      './assets/game/enemies/man1.json'
    );
    this.load.atlas(
      'athlete',
      './assets/game/enemies/man2.png',
      './assets/game/enemies/man2.json'
    );
    this.load.atlas(
      'armyZombie',
      './assets/game/enemies/army1.png',
      './assets/game/enemies/army1.json'
    );
    this.load.atlas(
      'femaleZombie',
      './assets/game/enemies/woman1.png',
      './assets/game/enemies/woman1.json'
    );
    this.load.atlas(
      'femaleZombieBrunet',
      './assets/game/enemies/woman2.png',
      './assets/game/enemies/woman2.json'
    );
    this.load.atlas(
      'policeZombie',
      './assets/game/enemies/police1.png',
      './assets/game/enemies/police1.json'
    );
    this.load.image('bullet', './assets/game/bullet1.png');
    this.load.image('empty-item', './assets/game/ui/element_0018_Layer-20.png');
    this.load.image(
      'active-item',
      './assets/game/ui/element_0017_Layer-19.png'
    );
    this.load.audio('person-walk', './assets/audio/person-walk.mp3');
    this.load.audio('rifle-shot', './assets/audio/rifle-shot.mp3');
  }

  handleCollides(targetsArray: Phaser.Tilemaps.TilemapLayer[]) {
    if (!this.zombie || !this.person) {
      throw new Error('There are no person or zombie ');
    }
    this.physics.add.collider([this.zombie, this.person], targetsArray);
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
      COORDINATES.start[0],
      COORDINATES.start[1],
      'person'
    );

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

    this.zombie = this.add.zombie(360, 360, 'zombie');

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
    this.handleCollides([this.walls[0], this.walls[1], floor2]);

    this.physics.add.collider(
      this.bullets,
      this.walls[0],
      Bullet.handleBulletAndWallsCollision.bind(this)
    );

    this.physics.add.collider(
      this.bullets,
      this.zombie,
      Bullet.handleBulletAndEnemyCollision.bind(this)
    );

    (this.person as Person).createRotationAndAttacking(
      this,
      this.personRifleSound
    );

    // appending scene PersonUI

    this.personUi = new PersonUI(this, this.person as Person);
    new EventFactory(
      this,
      this.person,
      [roof0, roof1, roof2, roof3],
      this.personUi
    );
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
    this.scene.run('person-ui');

    this.createGroupOfZombies();
  }

  createGroupOfZombies() {
    if (!this.person && !this.bullets) {
      throw new Error('Not found');
    }

    this.zombies = this.physics.add.group({
      classType: Zombie,
      maxSize: this.tmpEnemyCount,
    });

    function getCoord() {
      return 500 + Math.random() * 300;
    }

    for (let i = 0; i < this.tmpEnemyCount; i += 1) {
      const texture = Object.keys(ZOMBIES)[Math.floor(Math.random() * 5)];
      const zombie = this.add.zombie(getCoord(), getCoord(), texture);

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
            this,
            this.personUi as PersonUI
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
      this.createGroupOfZombies();
    }

    if (!this.personUi) {
      throw new Error("PersonUI isn't found");
    }

    (this.person as Person).selfHealing(this);
    this.zombie?.update();

    Array.from(this.zombies?.children.entries as Zombie[]).forEach(zombie => {
      zombie.update();
      zombie.movingToPerson(this.person as Person, this);
    });

    if (this.zombie === null || this.person === null) {
      throw new Error();
    }

    if (!this.zombie?.scene) {
      //TODO
      sceneEvents.emit(`killZombieEvent`);
      this.zombie = this.add.zombie(
        Math.random() * 480 + 350,
        Math.random() * 480 + 350,
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
        Bullet.handleBulletAndEnemyCollision.bind(this)
      );
    }

    if (this.person) {
      this.person.update(
        createUserKeys(this.input),
        time,
        this.bullets,
        this.personWalkSound,
        this.personUi
      );
    }

    (this.zombie as Zombie).movingToPerson(this.person as Person, this);
  }
}
