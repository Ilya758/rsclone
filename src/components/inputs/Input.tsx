import { LabelStyle, InputStyle } from './input.style';
import {ChangeEvent, useState} from "react";

interface InputProps {
  type: string;
  text: string;
  placeholder: string;
  id: string;
}

const Input = ({ type, text, placeholder, id }: InputProps) => {
  const [login, setLogin] = useState<string>(() => '')
  
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLogin(e.target.value);
  }
  console.log(login)
  return (
    <>
      <LabelStyle htmlFor={type}>{text}</LabelStyle>
      <InputStyle
        value={login}
        onChange={(e) => onInputChange(e)}
        type={type} id={id}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
