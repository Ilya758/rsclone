import { WrapperStyle, HeaderStyle } from './formRegistration.style';
import Input from '../inputs/Input';
import ErrorMessage from '../messages/errorMessage/ErrorMessage';
import React, {useEffect, useState} from "react";
import {onChange} from "../../utils/onChange";
import {useAppDispatch, useAppSelector} from "../storeHooks";
import { loadUser, loadUserStatus, setCredentials } from "../../stores/reducers/userReducer";
import { tokenValidation } from "../../services/tokenValidation";

interface IUserCredentials {
  login: string;
  password: string;
}

function FormRegistration() {
  const [login, setLogin] = useState<string>(() => '');
  const [password, setPassword] = useState<string>(() => '');
  const [auth, setAuth] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  
  // start of code for testing purposes
  const state = useAppSelector((state) => state.user)
  useEffect(() => {
    const isAuth = tokenValidation(state.token)
    setAuth(isAuth)
  }, [state])
  // end of code for testing purposes
  
  const submitHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const credentials: IUserCredentials = {
      login: login,
      password: password
    }
    dispatch(setCredentials(credentials))
    dispatch(loadUser({login: login, password: password}))
    setPassword('');
    setLogin('');
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
