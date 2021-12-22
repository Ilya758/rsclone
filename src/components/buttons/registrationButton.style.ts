import styled, { keyframes } from 'styled-components';

const show = keyframes`
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

export const ButtonStyle = styled.button`
  position: absolute;
  z-index: 15;
  bottom: -10px;
  left: calc(50% - 154px);
  width: 308px;
  height: 69px;
  border: none;
  animation: ${show} 2.3s linear;
  background-color: transparent;
  background-image: url('./assets/registration-form/50.png'),
    url('./assets/registration-form/281.svg');
  background-position-x: 50%, 50%;
  background-position-y: 50%, 50%;
  background-repeat: no-repeat;
  background-size: cover, 60%;
  cursor: pointer;
  outline: none;
  &:hover {
    background-image: url('./assets/registration-form/50.png'),
      url('./assets/registration-form/281.svg'),
      url('./assets/registration-form/283.svg');
    background-position-x: 30%, 50%, 50%;
    background-position-y: 30%, 50%, 30%;
    background-size: cover, 60%, 60%;
    color: blue;
  }
`;
