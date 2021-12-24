import { LabelStyle, InputStyle } from './input.style';
import {ChangeEvent} from "react";

interface InputProps {
  type: string;
  text: string;
  placeholder: string;
  id: string;
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = ({ type, text, placeholder, id, callback, value }: InputProps) => {
  return (
    <>
      <LabelStyle htmlFor={type}>{text}</LabelStyle>
      <InputStyle
        value={value}
        onChange={(e) => callback(e)}
        type={type} id={id}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
