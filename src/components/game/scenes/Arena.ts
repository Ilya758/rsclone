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
import { io, Socket } from "socket.io-client";

export interface IPlayer {
  x: number,
  y: number,
  rotation: number,
  playerId: string,
  firing: boolean
}

export interface IPlayers {[index: string]: IPlayer}

export default class Dungeon extends Phaser.Scene {
  protected personUi: PersonUI | null;

  protected person: Phaser.Physics.Arcade.Sprite | null;

  private zombie: Phaser.Physics.Arcade.Sprite | null;

  private bullets: Phaser.GameObjects.Group | null;

  private personWalkSound: Phaser.Sound.BaseSound | null;

  private personRifleSound: Phaser.Sound.BaseSound | null;
  private socket: Socket | undefined;
  private otherPlayers: Phaser.GameObjects.Group | undefined;
  private oldPosition: { rotation: number; x: number; y: number; } | undefined;
  private hp: number;
  private speed: number;
  private damage: number;

  constructor() {
    super('dungeon');
    this.person = null;
    this.zombie = null;
    this.bullets = null;
    this.personUi = null;
    this.hp = 150;
    this.speed = 50;
    this.damage = 10;
    this.personWalkSound = this.personRifleSound = null;
  }

  preload() {
    this.load.image('floor', './assets/game/tiles/floor.png');
    this.load.image('walls', './assets/game/tiles/walls.png');
    this.load.image('other2', './assets/game/tiles/other2.png');
    this.load.image('furniture', './assets/game/tiles/furniture.png');
    this.load.image('tech', './assets/game/tiles/tech.png');
    this.load.tilemapTiledJSON('main', './assets/game/map/arena.json');
    this.load.atlas(
      'person',
      './assets/game/characters/man.png',
      './assets/game/characters/man.json'
    );
    this.load.atlas(
      'otherPerson',
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
    this.socket = io("https://rscloneback.herokuapp.com/");
    console.log(this.socket)
    this.otherPlayers = this.physics.add.group();
    this.socket.on('currentPlayers', (players: IPlayers) => {
      Object.keys(players).forEach((id) => {
        if (this.socket && players[id].playerId === this.socket.id) {
          console.log(players)
        } else {
          const otherPerson = this.add.person(players[id].x, players[id].y, 'person');
          otherPerson.playerId = players[id].playerId;
          if(this.otherPlayers) this.otherPlayers.add(otherPerson);
          otherPerson.anims.play('idle_riffle');
        }
      });
    });

    this.socket.on('newPlayer', (playerInfo: IPlayer) => {
      const otherPerson: Person = this.add.person(playerInfo.x, playerInfo.y, 'person');
      otherPerson.playerId = playerInfo.playerId;
      otherPerson.anims.play('idle_riffle');
      if(this.otherPlayers) this.otherPlayers.add(otherPerson);
    });

    this.socket.on('discon', (playerId: string) => {
      if(this.otherPlayers) this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerId === (otherPlayer as Person).playerId) {
          otherPlayer.destroy();
        }
      });
    });

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
    const tilesetFurniture = map.addTilesetImage('furniture');
    const tilesetTech = map.addTilesetImage('tech');

    // create layer

    const ground = map.createLayer('ground', [tileset, tilesetWalls], 0, 0);
    const walls = map.createLayer('walls', [tilesetWalls, tileset], 0, 0);
    map.createLayer('shadow', [tilesetTech], 0, 0);
    const assets = map.createLayer('assets', [ tilesetFurniture, tilesetTech], 0, 0);
    // create collision

    ground.setCollisionByProperty({ collides: true });
    walls.setCollisionByProperty({ collides: true });
    assets.setCollisionByProperty({ collides: true });
    debugGraphicsDraw(walls, this);
    debugGraphicsDraw(assets, this);

    // person and enemies initialization

    this.person = this.add.person(225, 1355, 'person');
    this.zombie = this.add.zombie(570, 190, 'zombie');
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
    this.handleCollides([walls, assets]);

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

    this.socket.on('playerMoved', (playerInfo: IPlayer) => {
      if(this.otherPlayers) this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerInfo.playerId === (otherPlayer as Person).playerId) {
          (otherPlayer as Person).setRotation(playerInfo.rotation);
          (otherPlayer as Person).setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });

    this.socket.on('enemyInteraction', (enemyInfo) => {
      this.zombie?.setRotation(enemyInfo.rotation);
      this.zombie?.setPosition(enemyInfo.x, enemyInfo.y);
      (this.zombie as Zombie).hpBar.setValue(enemyInfo.hp)
    });

    this.socket.on('firing', (playerInfo: IPlayer) => {
      if(this.otherPlayers) this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerInfo.playerId === (otherPlayer as Person).playerId) {
          if(playerInfo.firing) {
            (otherPlayer as Person).anims.play('rifle');
          }
          if(!playerInfo.firing) {
            (otherPlayer as Person).anims.play('idle_rifle');
          }
        }
      });
    });


    this.input.on('pointerdown', () => {
      if(this.socket) this.socket.emit('firing', { status: true });
    });

    this.input.on('pointerup', () => {
      if(this.socket) this.socket.emit('firing', { status: false });
    });

  }

  update(time?: number): void {

    // TODO: update all

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
        Math.random() * 1300 + 88,
        Math.random() * 650 + 168,
        'zombie'
      );
      this.hp += 50;
      this.speed += 10;
      this.damage += 1;
      (this.zombie as Zombie).damage = this.damage;
      (this.zombie as Zombie).speed = this.speed;
      (this.zombie as Zombie).hpBar.setValue(this.hp)


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

    (this.zombie as Zombie).movingToPerson(<Person>this.physics.closest(this.zombie as Zombie), this);
    const x = this.person.x;
    const y = this.person.y;
    const r = this.person.rotation
    if (this.oldPosition && (x !== this.oldPosition.x || y !== this.oldPosition.y || r !== this.oldPosition.rotation)) {
      if(this.socket) this.socket.emit('playerMovement', { x: this.person.x, y: this.person.y, rotation: this.person.rotation });
    }
    console.log('X: ' + this.person.x, 'Y: ' + this.person.y)

    // save old position data
    this.oldPosition = {
      x: this.person.x,
      y: this.person.y,
      rotation: this.person.rotation
    };
    if(this.socket) this.socket.emit('enemyInteraction', {x: this.zombie.x, y: this.zombie.y, rotation: this.zombie.rotation, hp: (this.zombie as Zombie).hpBar.value});
  }
}
