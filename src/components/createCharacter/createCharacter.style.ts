import { IGenericButtonStyle } from './../../types/IGenericButtonStyle';
import styled, { keyframes } from 'styled-components';

const showForm = keyframes`
  0% {
    opacity: 0;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const HeaderStyle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  color: rgb(15, 4, 82);
  margin: 20px 0px 10px 0px;
`;

export const LinkWrapperStyle = styled.div`
  position: relative;
  width: 250px;
  height: 240px;
  left: -49px;
  margin-top: 10px;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WrapperStyle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  animation: ${showForm} 2.2s linear;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BGWrapperStyle = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  padding: 0px 20px;
  box-sizing: border-box;
  justify-content: flex-start;
  width: 240px;
  height: 100%;
  align-items: center;
  align-content: space-between;
  background: url('./assets/game/ui/element_0075_Layer-77.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  flex-direction: column;
`;

export const BackgroundStyle = styled.div<IGenericButtonStyle>`
  left: calc(50% - 100px);
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(50, 39, 27, 1);
  border-radius: 4px;
`;
