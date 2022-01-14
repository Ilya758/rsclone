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
    content: 'Clone Zero';
    animation: ${showHeader} 2s linear;
    position: absolute;
    top: -80px;
    z-index: 10;
    left: calc(50% - 300px);
    display: block;
    width: 601px;
    height: 100px;
    background-image: url('./assets/game/ui/element_0000_Layer-2.png');
    background-size: 601px 99px;
    background-repeat: no-repeat;
    font: 700 44px 'Orbitron', sans-serif;
    color: rgb(15, 4, 82);
    line-height: 100px;
    text-align: center;
  }
`;

export const ContainerStyle = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-image: url('./assets/registration-form/bg-man.png'),
    url('./assets/registration-form/bg-woman.png'),
    url('./assets/registration-form/destroyed-structure.png'),
    url('./assets/registration-form/destroyed-structure-small.png');
  background-position-x: 15%, 85%, 5%, 85%;
  background-position-y: 50%, 100%, 100%, 100%;
  background-repeat: no-repeat;
  background-size: 353px 447px, 227px 421px, 582px 393px, 329px 60px;
`;

export const RegistrationWrapperStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('./assets/registration-form/bg-line-bottom.png'),
    url('./assets/registration-form/left-triangle.png'),
    url('./assets/registration-form/right-triangle.png');
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
