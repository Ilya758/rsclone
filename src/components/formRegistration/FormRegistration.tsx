import { WrapperStyle, HeaderStyle } from './formRegistration.style';
import Input from '../inputs/Input';
import ErrorMessage from '../messages/errorMessage/ErrorMessage';
import {ChangeEvent, useState} from "react";

function FormRegistration() {
  const [login, setLogin] = useState<string>(() => '');
  const [password, setPassword] = useState<string>(() => '');
  
  const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLogin(e.target.value);
  }
  
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  }
  console.log(login)
  console.log(password)
  return (
    <WrapperStyle>
      <HeaderStyle>Enter to the CloneZero!</HeaderStyle>
      <Input
        callback={onLoginChange}
        type="text" text="Login"
        placeholder="Enter login"
        id="login"
        value={login}
      />
      <Input
        callback={onPasswordChange}
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
