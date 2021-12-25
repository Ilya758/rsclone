import styled from 'styled-components';
import { IGenericButtonStyle } from '../../types/IGenericButtonStyle';

export const WrapperStyle = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100px;
`;

export const LevelProfWrapperStyle = styled.div`
  width: 100%;
  height: 23px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

export const LevelWrapperStyle = styled.div`
  width: 150px;
  height: 100%;
  box-sizing: border-box;
  background-image: url('./assets/svg/level-wrapper.svg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProfWrapperStyle = styled.div<IGenericButtonStyle>`
  width: 23px;
  height: 100%;
  box-sizing: border-box;
  background-image: ${props =>
    ` url('./assets/svg/professions/${props.background}.svg')`};
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px solid rgba(50, 39, 27, 1);
`;

export const SkillTextType = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  justify-content: space-between;
`;

export const TextType = styled.div`
  font-size: 14px;
  height: 100%;
  line-height: 21px;
  display: inline-block;
  text-align: end;
  padding: 2px 5px;
  color: rgb(0, 198, 198);
`;
