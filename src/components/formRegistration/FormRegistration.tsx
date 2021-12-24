import { WrapperStyle, HeaderStyle } from './formRegistration.style';
import Input from '../inputs/Input';
import ErrorMessage from '../messages/errorMessage/ErrorMessage';
import React, {useState} from "react";
import {onChange} from "../../utils/onChange";


function FormRegistration() {
  const [login, setLogin] = useState<string>(() => '');
  const [password, setPassword] = useState<string>(() => '');
  
  const submitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(login)
    console.log(password)
  }
  
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
        {/*Change style of this button to look like RegistrationButton*/}
        <input type="submit" onClick={(e) => submitHandler(e)}/>
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
