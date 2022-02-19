import styled from 'styled-components';

export const ButtonStyle = styled.button`
  position: absolute;
  font-family: 'Orbitron', sans-serif;
  right: -40px;
  top: -50px;
  margin: 0px;
  padding: 0px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  &:hover svg {
    fill: rgb(212, 232, 108);
  }
`;
