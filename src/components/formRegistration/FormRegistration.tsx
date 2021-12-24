import { WrapperStyle, HeaderStyle } from './formRegistration.style';
import Input from '../inputs/Input';
import ErrorMessage from '../messages/errorMessage/ErrorMessage';
import {useState} from "react";

function FormRegistration() {

  return (
    <WrapperStyle>
      <HeaderStyle>Enter to the CloneZero!</HeaderStyle>
      <Input type="text" text="Login" placeholder="Enter login" id="login" />
      <Input
        type="password"
        text="Password"
        placeholder="Enter password"
        id="password"
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
