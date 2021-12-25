import styled from 'styled-components';

export const SelectStyle = styled.select`
  background-color: transparent;
  width: 164px;
  height: 27.2px;
  background-image: url('./assets/images/360.png');
  background-size: cover;
  outline: none;
  border: none;
  padding: 3px 8px;
  color: white;
  cursor: pointer;
  box-sizing: border-box;
  & option:nth-child(n) {
    background: rgba(95, 82, 65, 1);
  }
`;

export const LabelStyle = styled.label`
  width: 100%;
  display: inline-block;
  padding-left: 5px;
`;
