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
import debugGraphicsDraw from '../../../utils/debug';

export default class Dungeon extends Phaser.Scene {
  protected personUi: PersonUI | null;

  protected person: Phaser.Physics.Arcade.Sprite | null;

  private zombie: Phaser.Physics.Arcade.Sprite | null;

  private bullets: Phaser.GameObjects.Group | null;

  private personWalkSound: Phaser.Sound.BaseSound | null;

  private personRifleSound: Phaser.Sound.BaseSound | null;

  constructor() {
    super('dungeon');
    this.person = null;
    this.zombie = null;
    this.bullets = null;
    this.personUi = null;
    this.personWalkSound = this.personRifleSound = null;
  }

  preload() {
    this.load.image('floor', './assets/game/tiles/floor.png');
    this.load.image('walls', './assets/game/tiles/walls.png');
    this.load.image('other', './assets/game/tiles/other.png');
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
    this.load.image('bullet', './assets/game/bullet1.png');

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
    this.input.setDefaultCursor('url(assets/game/cursors/cursor.cur), pointer');
    createCharacterAnims(this.anims);
    createZombieAnims(this.anims);

    // create map

    const map = this.make.tilemap({
      key: 'main',
    });

    // added tilesets

    const tileset = map.addTilesetImage('floor');
    const tilesetWalls = map.addTilesetImage('walls');
    const tilesetOther2 = map.addTilesetImage('other2');
    const tilesetFurniture = map.addTilesetImage('furniture');

    // create layer

    const floor = map.createLayer('floor', [tileset, tilesetWalls], 0, 0);
    const floor2 = map.createLayer(
      'floor2',
      [tileset, tilesetWalls, tilesetFurniture],
      0,
      0
    );
    map.createLayer('shadows', tilesetOther2, 0, 0);
    const walls2 = map.createLayer(
      'walls2',
      [tilesetWalls, tilesetFurniture, tilesetOther2],
      0,
      0
    );
    const walls = map.createLayer(
      'walls',
      [tileset, tilesetWalls, tilesetOther2, tilesetFurniture],
      0,
      0
    );

    // create collision

    floor.setCollisionByProperty({ collides: true });
    floor2.setCollisionByProperty({ collides: true });
    walls.setCollisionByProperty({ collides: true });
    walls2.setCollisionByProperty({ collides: true });

    debugGraphicsDraw(walls, this);
    debugGraphicsDraw(walls2, this);

    // person and enemies initialization

    this.person = this.add.person(440, 440, 'person');
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
    this.handleCollides([walls, walls2, floor2]);

    this.physics.add.collider(
      this.bullets,
      walls,
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

  update(time?: number): void {
    if (!this.personUi) {
      throw new Error("PersonUI isn't found");
    }

    (this.person as Person).selfHealing(this);
    this.zombie?.update();

    if (this.zombie === null || this.person === null) {
      throw new Error();
    }

    if (!this.zombie?.scene) {
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
        this.personWalkSound
      );
    }

    (this.zombie as Zombie).movingToPerson(this.person as Person, this);
  }
}