export interface IZombieChars {
  hp: number;
  speed: number;
  damage: number;
  // scale: number[];
  // size: number[];
  // offset: number[];
}

export interface IZombies {
  [zombie: string]: IZombieChars;
}
