export interface ICharacterType {
  name: string;
  id: string;
  background: string;
  profession: string;
  city: string;
  coins: number;
  skills: ISkillType;
  stats: number;
  health: number[];
  locationtime: number;
  coordinate: ICoordinate;
}

export interface ISkillType {
  strength: number;
  agility: number;
  instinct: number;
  endurance: number;
  accuracy: number;
  intellect: number;
}

export interface ICoordinate {
  outside: boolean;
  object: string;
  coordinate: number[];
}
