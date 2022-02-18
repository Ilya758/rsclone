export interface IZombieChars {
  hp: number;
  speed: number;
  damage: number;
}

export interface IZombies {
  [zombie: string]: IZombieChars;
}
