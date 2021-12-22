import styled, { keyframes } from 'styled-components';

const changeFlex = keyframes`
  0% {
    flex: 0;
    min-height: 0px;
  }
  100% {
    flex: 7;
    min-height: 430px;
  }
`;

const showHeader = keyframes`
  0% {
opacity: 0;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

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

const showButtonsContainer = keyframes`
  0% {
opacity: 0;
  }
  80% {
    opacity: 0;
    bottom: -55px;
  }
  100% {
    opacity: 1;
    bottom: -65px;
  }
`;

const showButtons = keyframes`
  0% {
opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const MainStyle = styled.div`
  position: relative;
  width: 100%;
  flex: 7;
  min-height: 430px;
  animation: ${changeFlex} 1.5s linear;
  box-sizing: border-box;
  background-color: black;
  background-image: url('./assets/registration-form/registration-bg.jpg');
  background-position: 50%;
  background-size: cover;
  &::before {
    content: '';
    animation: ${showHeader} 2s linear;
    position: absolute;
    top: -65px;
    z-index: 10;
    left: calc(50% - 300px);
    display: block;
    width: 601px;
    height: 100px;
    background-image: url('./assets/registration-form/92.png'),
      url('./assets/registration-form/89.png');
    background-size: 601px 99px, 600px 90px;
    font: 500 40px Arial, sans-serif;
    color: #fff;
    content: 'CloneZero';
    line-height: 100px;
    text-align: center;
  }
  &::after {
    content: '';
    position: absolute;
    z-index: 5;
    left: calc(50% - 293px);
    bottom: -65px;
    width: 587px;
    height: 68px;
    animation: ${showButtonsContainer} 2s linear;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-image: url('./assets/registration-form/44.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export const ContainerStyle = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-image: url('./assets/registration-form/148.png'),
    url('./assets/registration-form/139.png'),
    url('./assets/registration-form/113.png'),
    url('./assets/registration-form/116.png');
  background-position-x: 15%, 80%, 5%, 85%;
  background-position-y: 50%, 100%, 100%, 100%;
  background-repeat: no-repeat;
  background-size: 353px 447px, 227px 421px, 582px 393px, 329px 60px;
`;

export const FormRegistrationStyle = styled.div`
  width: 318px;
  height: 230px;
  display: flex;
  opacity: 1;
  animation: ${showFormContainer} 2s linear;
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

export const RegistrationWrapperStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('./assets/registration-form/47.png'),
    url('./assets/registration-form/32.png'),
    url('./assets/registration-form/29.png');
  background-position-x: 29px, 0%, 100%;
  background-position-y: 100%, 100%, 100%;
  background-repeat: no-repeat;
  background-size: calc(100% - 58px) 9px, 29px 19px, 29px 19px;
`;

export const ButtonWrapperStyle = styled.button`
  padding: 5px;
  margin: 5px 5px;
  background-color: transparent;
  animation: ${showButtons} 2.2s linear;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
