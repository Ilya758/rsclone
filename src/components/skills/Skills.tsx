import { SkillsWrapperStyle, SkillTextType, TextType } from './skills.style';
import { SKILLS } from '../../constants/skills';
import { ISkill } from './skills.types';

const Skills = ({ data }: ISkill) => {
  return (
    <SkillsWrapperStyle>
      {SKILLS.map((skill, ind) => (
        <SkillTextType key={ind}>
          <TextType>{skill}</TextType>
          <TextType>{data[ind]}</TextType>
        </SkillTextType>
      ))}
    </SkillsWrapperStyle>
  );
};

export default Skills;
