import styled from 'styled-components';

export const LabelStyle = styled.label`
  width: 100%;
  display: inline-block;
  margin-top: 20px;
`;

export const InputStyle = styled.input`
  background-color: rgba(0, 0, 0, 0.1);
  outline: none;
  border: 1px solid white;
  border-radius: 5px;
  padding: 3px 20px 3px 10px;
  color: white;
  &:hover {
    border: 1px solid blue;
  }
`;
