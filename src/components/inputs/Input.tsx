import { LabelStyle, InputStyle } from './input.style';

interface InputProps {
  type: string;
  text: string;
  placeholder: string;
  id: string;
}

const Input = ({ type, text, placeholder, id }: InputProps) => {
  return (
    <>
      <LabelStyle htmlFor={id}>{text}</LabelStyle>
      <InputStyle type={type} id={id} placeholder={placeholder} />
    </>
  );
};

export default Input;
