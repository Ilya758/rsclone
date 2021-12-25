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
  color: white;
`;

export const HeaderStyle = styled.h1`
  padding: 0px;
  font-size: 18px;
  margin: 0px;
  color: white;
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
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  background-image: url('./assets/registration-form/form.png'),
    url('./assets/registration-form/form-bg.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%, 93% 88%;
  background-position-x: 50%;
  background-position-y: 50%;
`;
