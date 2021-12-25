import {
  LevelWrapperStyle,
  WrapperStyle,
  LevelProfWrapperStyle,
  ProfWrapperStyle,
  TextType,
} from './levelProfStats.style';
import { ILevelProfStats } from './levelProfStats.types';

const LevelProfStats = ({ data }: ILevelProfStats) => {
  return (
    <WrapperStyle>
      <LevelProfWrapperStyle>
        <ProfWrapperStyle></ProfWrapperStyle>
        <LevelWrapperStyle>
          <TextType>{data[0]}</TextType>
        </LevelWrapperStyle>
      </LevelProfWrapperStyle>
    </WrapperStyle>
  );
};

export default LevelProfStats;
