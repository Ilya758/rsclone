// import {
//   SkillsWrapperStyle,
//   SkillTextStyle,
//   TextStyle,
//   ButtonsContainerStyle,
// } from './skills.style';
// import { SKILLS } from '../../constants/skills';
// import { ISkill } from './skills.types';
// import SmallButton from '../buttons/smallButtons/minusPlusButton/PlusMinusButton';
//
// const Skills = ({ data, handleChange, Minus, isShowStatChanger }: ISkill) => {
//   return (
//     <SkillsWrapperStyle>
//       {SKILLS.map((skill, ind) => (
//         <SkillTextStyle key={ind}>
//           <TextStyle>{skill}</TextStyle>
//           <ButtonsContainerStyle>
//             {isShowStatChanger && (
//               <SmallButton
//                 type={'plus'}
//                 changeHandle={() => handleChange(skill, 'plus')}
//               />
//             )}
//             {data[skill as keyof typeof data] > Minus && (
//               <SmallButton
//                 type={'minus'}
//                 changeHandle={() => handleChange(skill, 'minus')}
//               />
//             )}
//           </ButtonsContainerStyle>
//           <TextStyle>{data[skill as keyof typeof data]}</TextStyle>
//         </SkillTextStyle>
//       ))}
//     </SkillsWrapperStyle>
//   );
// };
// export default Skills;
