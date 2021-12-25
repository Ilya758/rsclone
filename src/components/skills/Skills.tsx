import {
  SkillsWrapperStyle,
  SkillTextStyle,
  TextStyle,
  ButtonsContainerStyle,
} from './skills.style';
import { SKILLS } from '../../constants/skills';
import { ISkill } from './skills.types';
import SmallButton from '../buttons/smallButtons/minusPlusButton/PlusMinusButton';

const Skills = ({ data, handleChange, isMinus }: ISkill) => {
  console.log(isMinus);
  return (
    <SkillsWrapperStyle>
      {SKILLS.map((skill, ind) => (
        <SkillTextStyle key={ind}>
          <TextStyle>{skill}</TextStyle>
          <ButtonsContainerStyle>
            <SmallButton
              type={'plus'}
              changeHandle={() => handleChange(skill, 'plus')}
            />
            {isMinus && (
              <SmallButton
                type={'minus'}
                changeHandle={() => handleChange(skill, 'minus')}
              />
            )}
          </ButtonsContainerStyle>
          <TextStyle>{data.agility}</TextStyle>
        </SkillTextStyle>
      ))}
    </SkillsWrapperStyle>
  );
};
//TODO ввести нормальные типы {data.agility}
export default Skills;
