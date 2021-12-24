import { WrapperStyle, HeaderStyle } from './formRegistration.style';
import Input from '../inputs/Input';
import ErrorMessage from '../messages/errorMessage/ErrorMessage';
import React, { useEffect, useState } from 'react';
import { onChange } from '../../utils/onChange';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { loadUser, setCredentials } from '../../stores/reducers/userReducer';
import { tokenValidation } from '../../services/tokenValidation';
import { IUserCredentials } from '../../types/globals';
import RegistrationButton from '../buttons/RegistrationButton';

function FormRegistration() {
  const [login, setLogin] = useState<string>(() => '');
  const [password, setPassword] = useState<string>(() => '');
  const [auth, setAuth] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.user);

  useEffect(() => {
    const isAuth = tokenValidation(state.token);
    setAuth(isAuth);
  }, [state]);

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const credentials: IUserCredentials = {
      login: login,
      password: password,
    };
    dispatch(setCredentials(credentials));
    dispatch(loadUser({ login: login, password: password }));
    setPassword('');
    setLogin('');
  };

  return (
    <WrapperStyle>
      {!auth ? (
        <>
          <HeaderStyle>Enter to the CloneZero!</HeaderStyle>
          <Input
            callback={onChange(setLogin)}
            type="text"
            text="Login"
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
          <RegistrationButton
            onClick={e => submitHandler(e)}
            text={'Login / Registration'}
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
        </>
      ) : (
        <>
          <h1> YOU ARE LOGGED IN!</h1>
        </>
      )}
    </WrapperStyle>
  );
}

export default FormRegistration;
