export interface ICharacterType {
  name: string;
  background: string;
  profession: string;
  city: string;
  coins: number;
  skills: ISkillType;
}

export interface ISkillType {
  strength: number;
  agility: number;
  instinct: number;
  endurance: number;
  accuracy: number;
  intellect: number;
}
