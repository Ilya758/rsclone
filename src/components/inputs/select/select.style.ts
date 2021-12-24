import styled from 'styled-components';

export const SelectStyle = styled.select`
  background-color: transparent;
  outline: none;
  border: 1px solid white;
  border-radius: 5px;
  padding: 3px;
  color: white;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    border: 1px solid blue;
  }
  & option:nth-child(n) {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const LabelStyle = styled.label`
  width: 100%;
  display: inline-block;
  margin-top: 15px;
  &:first-of-type {
    margin-top: 0px;
  }
`;
