import styled from 'styled-components';

export const ButtonStyle = styled.button`
  position: absolute;
  z-index: 15;
  bottom: -13px;
  left: calc(50% - 154px);
  width: 308px;
  height: 69px;
  border: none;
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
