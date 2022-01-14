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
  bottom: -30px;
  left: calc(50% - 125px);
  width: 250px;
  height: 69px;
  border: none;
  animation: ${show} 2.3s linear;
  background-color: transparent;
  background-image: url('./assets/game/ui/element_0069_Layer-71.png');
  background-position-x: 50%;
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: cover, 60%;
  color: rgb(15, 4, 82);
  font: 600 16px 'Orbitron', sans-serif;
  cursor: pointer;
  outline: none;
  &:hover {
    color: rgb(115, 4, 82);
    font-weight: 700;
  }
`;
