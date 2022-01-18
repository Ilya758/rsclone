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
`;

export const RegistrationWrapperStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
