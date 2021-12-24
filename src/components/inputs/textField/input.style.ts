import styled from 'styled-components';

export const LabelStyle = styled.label`
  width: 204px;
  padding-left: 10px;
  display: inline-block;
  margin-top: 20px;
`;

export const InputStyle = styled.input`
  outline: none;
  border: none;
  width: 204px;
  height: 30px;
  box-sizing: border-box;
  background: url('./assets/svg/text-field.svg');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 3px 20px 3px 10px;
  color: white;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
