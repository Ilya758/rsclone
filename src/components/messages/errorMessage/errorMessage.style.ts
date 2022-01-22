import { IErrorMessage } from './errorMessage.types';
import styled from 'styled-components';

export const ErrorMessageStyle = styled.div<IErrorMessage>`
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  font-weight: bold;
  padding: ${props => `${props.padding}px`};
  margin: ${props => `${props.margin}px`};
  background-color: ${props => props.backgroundColor};
  border: ${props => props.border};
  color: ${props => props.color};
  cursor: ${props => props.cursor};
  letter-spacing: ${props => `${props.letterSpacing}px`};
  &:hover {
    color: ${props => props.hoverColor};
  }
`;
