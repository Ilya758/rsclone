import styled from 'styled-components';

export const SkillsWrapperStyle = styled.div`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  background-image: url('./assets/images/skills.png');
  background-repeat: no-repeat;
  background-size: 16px 96px;
  border-bottom: 2px solid rgba(50, 39, 27, 1);
`;

export const SkillTextStyle = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  justify-content: space-between;
`;

export const TextStyle = styled.div`
  font-size: 14px;
  display: block;
`;

export const ButtonsContainerStyle = styled.div`
  width: 30px;
  margin-left: auto;
  margin-right: 5px;
  display: block;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
