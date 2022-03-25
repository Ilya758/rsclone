import styled, { keyframes } from 'styled-components';
import { IGenericRegistration } from './formRegistration.types';

const showFormContainer = keyframes`
  0% {
    height: 0px;
  }
  80% {
    height: 0px;
  }
  100% {
    height: 230px;
  }
`;

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

const textColor = keyframes`
  0% {
    color: rgb(15, 4, 82);
  }
  45% {
    color: rgb(15, 4, 82);
  }
  75% {
  color: rgb(115, 4, 82);
  }
  100% {
    color: rgb(15, 4, 82);
  }
`;

export const WrapperStyle = styled.form`
  width: 100%;
  height: 100%;
  padding: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  animation: ${showForm} 2.2s linear;
  box-sizing: border-box;
  color: black;
`;

export const HeaderStyle = styled.h1`
  animation: ${textColor} 2s linear infinite;
  font-family: 'Orbitron', sans-serif;
  padding: 0px;
  font-size: 18px;
  margin: 0 0 15px 0;
  color: rgb(15, 4, 82);
`;

export const FormRegistrationStyle = styled.div<IGenericRegistration>`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  opacity: 1;
  animation: ${showFormContainer} 2s linear;
  transition: all 1s linear;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 35px;
  background-image: url('./assets/game/ui/element_0081_Layer-83.png'),
    url('./assets/game/ui/element_0082_Layer-84.png'),
    url('./assets/svg/form-bg.svg');
  background-repeat: no-repeat;
  background-size: 30px 100%, 30px 100%, 100% 100%;
  background-position-x: 0%, 100%;
  background-position-y: 50%, 50%;
  backdrop-filter: blur(10px);
`;
