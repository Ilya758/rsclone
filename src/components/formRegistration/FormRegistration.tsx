import { WrapperStyle, HeaderStyle } from './formRegistration.style';
import Input from '../inputs/Input';
import ErrorMessage from '../messages/errorMessage/ErrorMessage';
import {useState} from "react";
import {onChange} from "../../utils/onChange";

function FormRegistration() {
  const [login, setLogin] = useState<string>(() => '');
  const [password, setPassword] = useState<string>(() => '');
  
  console.log(login)
  console.log(password)
  return (
    <WrapperStyle>
      <HeaderStyle>Enter to the CloneZero!</HeaderStyle>
      <Input
        callback={onChange(setLogin)}
        type="text" text="Login"
        placeholder="Enter login"
        id="login"
        value={login}
      />
      <Input
        callback={onChange(setPassword)}
        type="password"
        text="Password"
        placeholder="Enter password"
        id="password"
        value={password}
      />
      <ErrorMessage
        text={'wrong login or password'}
        padding={0}
        hoverColor={''}
        margin={5}
        backgroundColor={'transparent'}
        color={'red'}
        border={'none'}
        cursor={'initial'}
      />
    </WrapperStyle>
  );
}

export default FormRegistration;
