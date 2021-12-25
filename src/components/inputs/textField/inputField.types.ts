import { ChangeEvent } from 'react';

export interface IInputProps extends IInputStyle {
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface IInputStyle {
  type?: string;
  text?: string;
  placeholder?: string;
  id?: string;
  value?: string;
  width?: string;
  height?: string;
  backgroundImage?: string;
  labelText?: string;
}
