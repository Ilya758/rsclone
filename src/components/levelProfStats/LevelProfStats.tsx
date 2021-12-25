import {
  LevelWrapperStyle,
  WrapperStyle,
  LevelProfWrapperStyle,
  ProfWrapperStyle,
  TextType,
} from './levelProfStats.style';
import { ILevelProfStats } from './levelProfStats.types';

const LevelProfStats = ({ profession, level }: ILevelProfStats) => {
  console.log(profession);
  return (
    <WrapperStyle>
      <LevelProfWrapperStyle>
        <ProfWrapperStyle background={profession} />
        <LevelWrapperStyle>
          <TextType>{profession}</TextType>
          <TextType>{`${level} level`}</TextType>
        </LevelWrapperStyle>
      </LevelProfWrapperStyle>
    </WrapperStyle>
  );
};

export default LevelProfStats;
