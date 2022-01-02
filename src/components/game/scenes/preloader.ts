import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('dungeon', './assets/game/dungeon.png');
    this.load.tilemapTiledJSON('prison', './assets/game/prison.json');
    this.load.atlas(
      'person',
      './assets/game/person.png',
      './assets/game/person.json'
    );
    this.load.atlas(
      'zombie',
      './assets/game/zombie.png',
      './assets/game/zombie.json'
    );
    this.load.image('bullet', './assets/game/bullet.png');
  }

  create() {
    this.scene.start('game');
  }
}
