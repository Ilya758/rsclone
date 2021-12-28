import { ISkillType } from '../createCharacter/createCharacter.type';

export interface ISkill {
  data: ISkillType;
  handleChange: (skill: string, plus: string) => void;
  Minus: number;
  isShowStatChanger: boolean;
}
