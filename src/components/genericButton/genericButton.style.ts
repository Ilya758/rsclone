import styled from "styled-components";

interface IGenericButtonStyle {
  padding: number;
  hoverColor: string;
  margin: number;
  backgroundColor: string;
  border: string;
  color: string;
  cursor: string;
}

export const ButtonWrapperStyle = styled.button<IGenericButtonStyle>`
  padding: ${(props) => `${props.padding}px`};
  margin: ${(props) => `${props.margin}px`};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  color: ${(props) => props.color};
  cursor: ${(props) => props.cursor};
  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;