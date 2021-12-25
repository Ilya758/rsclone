import styled from 'styled-components';
import { IInputStyle } from './inputField.types';

export const LabelStyle = styled.label<IInputStyle>`
  width: ${props => props.width};
  padding-left: 10px;
  box-sizing: border-box;
  display: inline-block;
  margin-top: 20px;
`;

export const InputStyle = styled.input<IInputStyle>`
  outline: none;
  border: none;
  width: ${props => props.width};
  height: ${props => props.height};
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.2);
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 3px 20px 3px 10px;
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
