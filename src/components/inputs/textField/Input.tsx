import { LabelStyle, InputStyle } from './input.style';
import { IInputProps } from './inputField.types';

const Input = ({
  type,
  labelText,
  placeholder,
  id,
  callback,
  value,
  width,
  height,
  backgroundImage,
}: IInputProps) => {
  return (
    <>
      <LabelStyle htmlFor={type} width={width}>
        {labelText}
      </LabelStyle>
      <InputStyle
        value={value}
        onChange={e => callback(e)}
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        width={width}
        height={height}
        backgroundImage={backgroundImage}
      />
    </>
  );
};

export default Input;
