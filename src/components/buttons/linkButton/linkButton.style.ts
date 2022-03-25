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
  font-family: 'Orbitron', sans-serif;
  width: 250px;
  height: 80px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border: none;
  animation: ${show} 2.3s linear;
  background-color: transparent;
  background-image: url('./assets/game/ui/element_0068_Layer-70.png');
  background-position-x: 50%;
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: cover, 60%;
  cursor: pointer;
  outline: none;
  &:hover {
    color: blue;
  }
  & a {
    color: rgb(15, 4, 82);
    font-weight: bold;
    display: inline-block;
    height: 100%;
    width: 100%;
    line-height: 55px;
    text-decoration: none;
  }
  &:hover a {
    color: rgb(115, 4, 82);
    font-size: 20px;
  }
`;
