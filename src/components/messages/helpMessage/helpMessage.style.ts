import { IHelpMessage } from './helpMessage.types';
import styled from 'styled-components';

export const HelpMessageStyle = styled.div<IHelpMessage>`
  display: ${props => props.display};
  position: absolute;
  z-index: 10;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  font-weight: bold;
  left: calc(50% - 309px);
  bottom: 0;
  top: -40px;
  width: 618px;
  height: 463px;
`;
