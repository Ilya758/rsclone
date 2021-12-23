import styled from 'styled-components';
import { IGenericButton } from './genericButton.types';

export const ButtonWrapperStyle = styled.button<IGenericButton>`
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
