import { ATLASES } from './../../../constants/atlases';
import Phaser from 'phaser';
import { createUserKeys } from '../../../utils/createUserKeys';
import { createCharacterAnims } from '../anims/PersonAnims';
import { createZombieAnims } from '../anims/ZombieAnims';
import Zombie from '../enemies/Zombie';
import Weapon from '../entities/Weapon';
import '../person/Person';
import '../enemies/Zombie';
import '../enemies/HandBoss';
import '../enemies/ClawBoss';
import '../enemies/MegaBoss';
import Person from '../person/Person';
import EventFactory from '../events/eventFactory';
import { ZOMBIES } from '../../../constants/zombies';
import { PERSON_COORDINATES } from '../../../constants/coordinates';
import plotHandle from '../plot/plotHandle';
import {
  IEnemySounds,
  IPersonPhrases,
  IPersonSounds,
  ITracks,
  TWeaponSounds,
} from './dungeon.types';
import { IWall } from './dungeon.types';
import { IMAGES } from '../../../constants/images';
import GameOver from './GameOver';
import { preloader } from '../utils/preloader';
import { PHRASES, SOUNDS } from '../../../constants/sounds';
import { createSceneSounds } from '../../../utils/createSceneSounds';
import { createMegaBossAnims } from '../anims/MegaBossAnims';
import MegaBoss from '../enemies/MegaBoss';
import EndOfTheGame from './EndOfTheGame';
import Light = Phaser.GameObjects.Light;

export default class Dungeon extends Phaser.Scene {
  protected person: Person | null;

  private bullets: Phaser.GameObjects.Group | null;

  public zombies: Phaser.Physics.Arcade.Group | null;

  private tmpEnemyCount = 250;

  private points: Phaser.Physics.Arcade.StaticGroup | null;

  private walls: IWall | [null];

  public personSounds: IPersonSounds | null;

  public enemySounds: IEnemySounds | null;

  public tracks: ITracks | null;

  private gameOver: GameOver | null;

  private personPhrases: IPersonPhrases | null;

  public weaponSoundsShot: TWeaponSounds;

  public weaponSoundsReload: TWeaponSounds;

  public finalBoss: MegaBoss | null;

  private traceLights: Map<Weapon, Light>;

  constructor() {
    super('dungeon');
    this.person = null;
    this.traceLights = new Map();
    this.zombies = this.finalBoss = null;
    this.bullets = null;
    this.points = null;
    this.walls = Array(2).fill(null) as [null];
    this.personSounds =
      this.enemySounds =
      this.tracks =
      this.personPhrases =
      this.gameOver =
        null;
    this.weaponSoundsShot = {
      pistol: null,
      rifle: null,
      shotgun: null,
      sniper: null,
      flamethrower: null,
    };
    this.weaponSoundsReload = {
      pistol: null,
      rifle: null,
      shotgun: null,
      sniper: null,
      flamethrower: null,
    };
  }

  preload() {
    IMAGES.forEach(img => {
      this.load.image(img.name, img.url);
    });
    ATLASES.forEach(atlas => {
      this.load.atlas(atlas.name, atlas.urlPNG, atlas.urlJSON);
    });
    SOUNDS.forEach(sound => {
      this.load.audio(sound.name, sound.url);
    });
    PHRASES.forEach(phrase => {
      this.load.audio(phrase.name, phrase.url);
    });
    this.load.tilemapTiledJSON('main', './assets/game/map/main.json');
    this.load.video('person-death', './assets/video/game-over.mp4');
    this.load.video('endOfTheGame', './assets/video/credits.mp4');
    preloader(this);
  }

  create() {
    this.lights.enable().setAmbientColor(0x423eef);
    this.points = this.physics.add.staticGroup();
    this.input.setDefaultCursor('url(assets/game/cursors/cursor.cur), pointer');
    createCharacterAnims(this.anims);
    createZombieAnims(this.anims, 'zombie');

    const map = this.make.tilemap({
      key: 'main',
    });

    const tileset = map.addTilesetImage('floor');
    const tilesetWalls = map.addTilesetImage('walls');
    const tilesetOther2 = map.addTilesetImage('other2');
    const tilesetTech = map.addTilesetImage('tech');
    const tilesetFurniture = map.addTilesetImage('furniture');
    const tilesetRoof = map.addTilesetImage('roof2');

    const floor = map.createLayer(
      'floor',
      [tileset, tilesetWalls, tilesetFurniture],
      0,
      0
    );
    floor.setPipeline('Light2D');

    const roof = map.createLayer('roof', [tilesetRoof, tilesetFurniture], 0, 0);
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
    roof.setPipeline('Light2D');
    roof0.setPipeline('Light2D');
    roof1.setPipeline('Light2D');
    roof2.setPipeline('Light2D');
    roof3.setPipeline('Light2D');
    floor2.setPipeline('Light2D');

    const checkPoints = map.getObjectLayer('CheckPoints');
    checkPoints.objects.forEach(point => {
      this.points?.get(point.x, point.y, point.name);
    });

    const mapPipe = map.createLayer(
      'shadows',
      [tilesetOther2, tilesetTech],
      0,
      0
    );
    mapPipe.setPipeline('Light2D');
    this.walls = {
      0: map.createLayer(
        'walls',
        [tileset, tilesetWalls, tilesetOther2, tilesetFurniture, tilesetTech],
        0,
        0
      ),
      1: map.createLayer(
        'walls2',
        [tileset, tilesetWalls, tilesetFurniture, tilesetOther2, tilesetTech],
        0,
        0
      ),
    };
    this.walls[0].setPipeline('Light2D');
    this.walls[1].setPipeline('Light2D');
    this.walls[0].depth = 4;

    // create collision

    floor.setCollisionByProperty({ collides: true });
    floor2.setCollisionByProperty({ collides: true });

    Object.values(this.walls).forEach(wall => {
      (wall as Phaser.Tilemaps.TilemapLayer).setCollisionByProperty({
        collides: true,
      });
    });

    this.person = this.add.person(
      PERSON_COORDINATES.start[0],
      PERSON_COORDINATES.start[1],
      'person'
    );
    this.person.setPipeline('Light2D');
    this.person.depth = 2;

    this.enemySounds?.horde.play();

    this.points.setVisible(false);
    this.points.children.entries.forEach((el, ind) => {
      if (!this.person) {
        throw new Error('Not found');
      }
      this.physics.add.overlap(this.person, el, () => {
        if (
          !this.person ||
          !this.person.userInterface ||
          !this.person.userInterface.uiPanel
        ) {
          throw new Error('Not found');
        }
        if (
          (checkPoints.objects[ind].name === 'roofQuest4' &&
            this.person.userInterface.uiPanel.zombieCounter > 15) ||
          checkPoints.objects[ind].name !== 'roofQuest4'
        ) {
          plotHandle(checkPoints.objects[ind].name, {
            ...(this.tracks as ITracks),
            ...this.personSounds,
            ...this.enemySounds,
          });
          el.destroy(true);
        }
      });
    });

    this.cameras.main.startFollow(this.person, true);

    createSceneSounds(this);

    this.bullets = this.physics.add.group({
      classType: Weapon,
      maxSize: 30,
      runChildUpdate: true,
    });

    this.physics.add.collider(this.person, [
      this.walls[0],
      this.walls[1],
      floor2,
    ]);

    this.physics.add.collider(
      this.bullets,
      this.walls[0],
      Weapon.handleBulletAndWallsCollision.bind(this)
    );

    (this.person as Person).createRotationAndAttacking(
      this,
      this.weaponSoundsShot
    );
    new EventFactory(
      this,
      this.person,
      [roof0, roof1, roof2, roof3],
      this.person.userInterface
    );

    this.scene.add('person-ui', this.person.userInterface);
    this.gameOver = new GameOver();
    this.scene.run('person-ui');
    this.scene.add('game-over', this.gameOver);
    this.scene.add('endOfTheGame', new EndOfTheGame());
  }

  createGroupOfZombies(array: number[][]) {
    if (!this.person && !this.bullets) {
      throw new Error('Not found');
    }

    if (!this.zombies?.children.entries.length) {
      this.zombies = this.physics.add.group({
        classType: Zombie,
        maxSize: this.tmpEnemyCount,
      });
    }

    for (let i = 0; i < array.length; i += 1) {
      const texture = Object.keys(ZOMBIES)[Math.floor(Math.random() * 5)];
      const zombie = this.add.zombie(array[i][0], array[i][1], texture);

      createZombieAnims(zombie.anims, texture);

      this.zombies.add(zombie);

      this.physics.add.collider(
        this.bullets as Phaser.GameObjects.Group,
        zombie,
        Weapon.handleBulletAndEnemyCollision.bind(
          this,
          zombie,
          this.bullets?.getChildren() as Phaser.GameObjects.GameObject[],
          this.enemySounds as IEnemySounds
        )
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
            this.personSounds as IPersonSounds
          )
      );
    }

    this.setCollisionBetweenZombies();

    this.tmpEnemyCount += 1;
  }

  createFinalBoss() {
    if (!this.person && !this.bullets) {
      throw new Error('Not found');
    }

    this.finalBoss = this.add.megaBoss(3700, 1250, 'megaBoss') as MegaBoss;
    this.finalBoss.setPipeline('Light2D');

    createMegaBossAnims(this.finalBoss.anims);

    this.physics.add.collider(
      this.bullets as Phaser.GameObjects.Group,
      this.finalBoss,
      Weapon.handleBulletAndEnemyCollision.bind(
        this,
        this.finalBoss,
        this.bullets?.getChildren() as Phaser.GameObjects.GameObject[],
        this.enemySounds as IEnemySounds
      )
    );

    Object.values(this.walls).forEach(wall => {
      this.physics.add.collider(
        this.finalBoss as MegaBoss,
        wall as Phaser.Tilemaps.TilemapLayer
      );
    });

    this.physics.add.collider(
      this.finalBoss,
      this.person as Phaser.Physics.Arcade.Sprite,
      () =>
        (this.person as Person).handleEnemyDamage(
          this.finalBoss as MegaBoss,
          this.person as Person,
          this,
          this.personSounds as IPersonSounds
        )
    );
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

  updateZombie(zombie: Zombie | MegaBoss) {
    if (!zombie.isDead) {
      zombie.update();
      zombie.movingToPerson(
        this.person as Person,
        this,
        this.enemySounds as IEnemySounds
      );
    }
  }

  update(time?: number): void {
    if (this.person) {
      const flashlight = this.lights.addLight(
        this.person.x,
        this.person.y,
        50,
        0xffffff,
        0.1
      );
      setTimeout(() => {
        this.lights.removeLight(flashlight);
      }, 0);
    }

    this.bullets?.getChildren().forEach(bullet => {
      const entity = bullet as Weapon;
      if (this.traceLights.has(entity)) {
        const tmp = this.traceLights.get(entity);
        tmp && tmp.setPosition(entity.x, entity.y);
        tmp && this.traceLights.set(entity, tmp);
      } else {
        const trace = this.lights.addLight(entity.x, entity.y, 50, 0xff0000, 5);
        this.traceLights.set(entity, trace);
      }
      setTimeout(() => {
        this.traceLights.forEach(value => {
          this.lights.removeLight(value);
        });
        this.traceLights = new Map();
      }, 0);
    });

    if (this.zombies?.children.entries.length) {
      Array.from(this.zombies?.children.entries as Zombie[]).forEach(zombie => {
        this.updateZombie(zombie);
        zombie.setPipeline('Light2D');
      });
    }

    if (this.finalBoss) {
      this.updateZombie(this.finalBoss);
    }

    if (this.person === null) {
      throw new Error();
    }

    if (this.person) {
      this.person.update(
        createUserKeys(this.input),
        time as number,
        this.bullets,
        this.personSounds as IPersonSounds,
        this.person.userInterface,
        this.weaponSoundsShot
      );
    }
  }

  getZombiesLength() {
    if (!this.zombies) throw new Error('error');
    return this.zombies.children.entries.length;
  }
}
