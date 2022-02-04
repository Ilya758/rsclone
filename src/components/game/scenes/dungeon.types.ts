export interface IWall {
  0: Phaser.Tilemaps.TilemapLayer;
  1: Phaser.Tilemaps.TilemapLayer;
}

export interface IPersonSounds {
  dead: Phaser.Sound.BaseSound;
  hit: Phaser.Sound.BaseSound;
  walk: Phaser.Sound.BaseSound;
  phrases: IPersonPhrases;
}

export interface IEnemySounds {
  aggressive: Phaser.Sound.BaseSound;
  dead: Phaser.Sound.BaseSound;
  hit: Phaser.Sound.BaseSound;
  horde: Phaser.Sound.BaseSound;
}

export interface ITracks {
  static: Phaser.Sound.BaseSound;
  dynamic: Phaser.Sound.BaseSound;
}

export interface IPersonPhrases {
  [phrase: string]: Phaser.Sound.BaseSound;
}
