import Phaser, { Scene } from 'phaser';
import { createUserKeys } from '../../../utils/createUserKeys';
import { createCharacterAnims } from '../anims/PersonAnims';
import Bullet from '../entities/bullet';
import '../person/Person';
import Person from '../person/Person';
import PersonUI from '../ui-kit/PersonUi';
// import debugGraphicsDraw from '../../../utils/debug';
import { io, Socket } from 'socket.io-client';

export interface IPlayer {
  x: number;
  y: number;
  rotation: number;
  playerId: string;
  firing: boolean;
}

interface IPlayerInfo {
  hp: number;
  playerId: string;
}

export interface IPlayers {
  [index: string]: IPlayer;
}

export default class Dungeon extends Phaser.Scene {
  protected personUi: PersonUI | null;

  protected person: Phaser.Physics.Arcade.Sprite | null;

  private bullets: Phaser.GameObjects.Group | null;

  private personWalkSound: Phaser.Sound.BaseSound | null;

  private personRifleSound: Phaser.Sound.BaseSound | null;
  private socket: Socket | undefined;
  private otherPlayers: Phaser.GameObjects.Group | undefined;
  private spawn: { x: number; y: number }[] | undefined;

  constructor() {
    super('dungeon');
    this.person = null;
    this.bullets = null;
    this.personUi = null;
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
    this.load.image('bullet', './assets/game/bullet1.png');

    this.load.audio('person-walk', './assets/audio/person-walk.mp3');
    this.load.audio('rifle-shot', './assets/audio/rifle-shot.mp3');
  }

  create() {
    this.spawn = [
      { x: 120, y: 174 },
      { x: 711, y: 483 },
      { x: 1028, y: 173 },
      { x: 1505, y: 173 },
      { x: 1356, y: 529 },
      { x: 834, y: 558 },
      { x: 345, y: 611 },
      { x: 98, y: 947 },
      { x: 581, y: 934 },
      { x: 903, y: 921 },
      { x: 1498, y: 962 },
      { x: 1498, y: 1224 },
      { x: 1445, y: 1553 },
      { x: 960, y: 1436 },
      { x: 476, y: 1541 },
      { x: 126, y: 1423 },
      { x: 104, y: 1104 },
      { x: 865, y: 1032 },
      { x: 990, y: 644 },
      { x: 717, y: 417 },
    ];

    // this.socket = io('ws://localhost:5000');
    this.socket = io('https://rscloneback.herokuapp.com/');
    this.otherPlayers = this.physics.add.group();
    this.socket.on('currentPlayers', (players: IPlayers) => {
      Object.keys(players).forEach(id => {
        if (this.socket && players[id].playerId === this.socket.id) {
          console.log(players);
        } else {
          let otherPerson;
          if (this.spawn) {
            const spawnPoint = Math.floor(Math.random() * this.spawn.length);
            otherPerson = this.add.person(
              this.spawn[spawnPoint].x,
              this.spawn[spawnPoint].y,
              'person'
            );
          }
          if (otherPerson) {
            otherPerson.playerId = players[id].playerId;
            (otherPerson as Person).anims.play('idle_rifle');
            if (this.otherPlayers) this.otherPlayers.add(otherPerson);
          }
        }
      });
    });

    this.socket.on('newPlayer', (playerInfo: IPlayer) => {
      const otherPerson: Person = this.add.person(
        playerInfo.x,
        playerInfo.y,
        'person'
      );
      otherPerson.playerId = playerInfo.playerId;
      otherPerson.anims.play('idle_rifle');
      if (this.otherPlayers) this.otherPlayers.add(otherPerson);
    });

    this.socket.on('discon', (playerId: string) => {
      if (this.otherPlayers)
        this.otherPlayers.getChildren().forEach(otherPlayer => {
          if (playerId === (otherPlayer as Person).playerId) {
            otherPlayer.destroy();
          }
        });
    });

    this.input.setDefaultCursor('url(assets/game/cursors/cursor.cur), pointer');
    createCharacterAnims(this.anims);
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
    const assets = map.createLayer(
      'assets',
      [tilesetFurniture, tilesetTech],
      0,
      0
    );
    // create collision

    ground.setCollisionByProperty({ collides: true });
    walls.setCollisionByProperty({ collides: true });
    assets.setCollisionByProperty({ collides: true });
    // debugGraphicsDraw(walls, this);
    // debugGraphicsDraw(assets, this);

    // person and enemies initialization

    const spawnPoint = Math.floor(Math.random() * this.spawn.length);
    this.person = this.add.person(
      this.spawn[spawnPoint].x,
      this.spawn[spawnPoint].y,
      'person'
    );
    this.cameras.main.startFollow(this.person, true);

    // creating the sounds

    this.personWalkSound = this.sound.add('person-walk', {
      volume: 0.5,
    });

    this.personRifleSound = this.sound.add('rifle-shot', {
      volume: 0.8,
      loop: true,
    });

    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true,
    });

    this.physics.add.collider(this.person, walls);
    this.physics.add.collider(this.person, assets);

    this.physics.add.collider(
      this.bullets,
      walls,
      Bullet.handleBulletAndWallsCollision.bind(this)
    );

    this.physics.add.collider(this.bullets, this.otherPlayers, (arg1, arg2) => {
      const resolvedHp = Person.handleBulletDamage(
        arg1,
        arg2,
        this,
        this.personUi
      );
      arg1.destroy(true);
      const data = arg2 as Person;
      if (this.socket) {
        this.socket.emit('playerMovement', {
          x: data.x,
          y: data.y,
          rotation: data.rotation,
        });
        this.socket.emit('damaged', {
          hp: resolvedHp,
        });
      }
    });

    (this.person as Person).createRotationAndAttacking(
      this,
      this.personRifleSound
    );

    // appending scene PersonUI

    this.personUi = new PersonUI(this, this.person as Person);
    this.scene.add('person-ui', this.personUi as unknown as Scene);

    this.socket.on('playerMoved', (playerInfo: IPlayer) => {
      if (this.otherPlayers)
        this.otherPlayers.getChildren().forEach(otherPlayer => {
          if (playerInfo.playerId === (otherPlayer as Person).playerId) {
            (otherPlayer as Person).setRotation(playerInfo.rotation);
            (otherPlayer as Person).setPosition(playerInfo.x, playerInfo.y);
          }
        });
    });

    this.socket.on('damaged', (playerInfo: IPlayerInfo) => {
      console.log(playerInfo);
      if (this.otherPlayers)
        this.otherPlayers.getChildren().forEach(otherPlayer => {
          if (playerInfo.playerId === (otherPlayer as Person).playerId) {
            (otherPlayer as Person).hpBar?.setValue(playerInfo.hp);
            if (((otherPlayer as Person).hpBar?.value as number) <= 0) {
              this.person?.destroy(true);
              //This is cringe, but works for now. Fix later.
              if (this.socket)
                this.socket.emit('damaged', {
                  hp: 100,
                });
              location.reload();
            }
          }
        });
    });

    this.socket.on('firing', (playerInfo: IPlayer) => {
      if (this.otherPlayers)
        this.otherPlayers.getChildren().forEach(otherPlayer => {
          if (playerInfo.playerId === (otherPlayer as Person).playerId) {
            if (playerInfo.firing) {
              (otherPlayer as Person).anims.play('rifle');
            }
            if (!playerInfo.firing) {
              (otherPlayer as Person).anims.play('idle_rifle');
            }
          }
        });
    });

    this.input.on('pointerdown', () => {
      if (this.socket) this.socket.emit('firing', { status: true });
    });

    this.input.on('pointerup', () => {
      if (this.socket) this.socket.emit('firing', { status: false });
    });

    this.scene.run('person-ui');
  }

  update(time?: number): void {
    if ((this.person as Person).hpBar?.value === 0)
      (this.person as Person).hpBar?.setValue((this.person as Person).hp);
    (this.person as Person).selfHealing(this);

    if (this.person) {
      this.person.update(
        createUserKeys(this.input),
        time,
        this.bullets,
        this.personWalkSound,
        this.personUi
      );
    }
    if (this.person) {
      if (this.socket)
        this.socket.emit('playerMovement', {
          x: this.person.x,
          y: this.person.y,
          rotation: this.person.rotation,
        });
    }
  }
}
