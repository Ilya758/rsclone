import {
  WrapperStyle,
  HeaderStyle,
  FormRegistrationStyle,
} from './formRegistration.style';
import Input from '../inputs/Input';
import ErrorMessage from '../messages/errorMessage/ErrorMessage';
import React, { useEffect, useState } from 'react';
import { onChange } from '../../utils/onChange';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { loadUser, setCredentials } from '../../stores/reducers/userReducer';
import { tokenValidation } from '../../services/tokenValidation';
import { IUserCredentials } from '../../types/globals';
import RegistrationButton from '../buttons/RegistrationButton';
import CreateCharacter from '../createCharacter/CreateCharacter';

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
    console.log(e.target);
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
    <>
      {!auth ? (
        <FormRegistrationStyle width={'300px'} height={'260px'}>
          <WrapperStyle>
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
          </WrapperStyle>
        </FormRegistrationStyle>
      ) : (
        <FormRegistrationStyle width={'600px'} height={'300px'}>
          <WrapperStyle>
            <CreateCharacter />
          </WrapperStyle>
        </FormRegistrationStyle>
      )}
    </>
  );
}

export default FormRegistration;
