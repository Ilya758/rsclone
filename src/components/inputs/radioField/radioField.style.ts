import styled from 'styled-components';
import { IRadioField } from './radioField.types';

export const FieldsetStyle = styled.fieldset`
  border: none;
  padding: 0px;
  margin: 5px;
`;

export const InputWrapperStyle = styled.div`
  position: relative;
  margin: 0px;
  width: 80px;
  height: 25px;
  box-sizing: border-box;
`;

export const InputStyle = styled.input`
  display: none;
`;

export const LabelWrapperStyle = styled.label`
  padding-left: 30px;
  color: white;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

export const CustomLabelStyle = styled.div<IRadioField>`
  content: '';
  left: 0px;
  top: 0px;
  position: absolute;
  display: block;
  border: 1px solid black;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background-image: url(${props => props.backgroundColor});
  background-position: 50%;
  background-size: contain;
`;
