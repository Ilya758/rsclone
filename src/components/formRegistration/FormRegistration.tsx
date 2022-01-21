import {
  WrapperStyle,
  HeaderStyle,
  FormRegistrationStyle,
} from './formRegistration.style';
import Input from '../inputs/textField/Input';
import ErrorMessage from '../messages/errorMessage/ErrorMessage';
import React, { useEffect, useState } from 'react';
import { onChange } from '../../utils/onChange';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { loadUser, setCredentials } from '../../stores/reducers/userReducer';
import { tokenValidation } from '../../services/tokenValidation';
import { IUserCredentials } from '../../types/globals';
import RegistrationButton from '../buttons/registrationButton/RegistrationButton';
import CreateCharacter from '../createCharacter/CreateCharacter';

function FormRegistration() {
  const [login, setLogin] = useState<string>(() => '');
  const [password, setPassword] = useState<string>(() => '');
  const [auth, setAuth] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false)
  const state = useAppSelector(state => state.user);

  useEffect(() => {
    const isAuth = tokenValidation(state.token);
    setAuth(isAuth);
    if(state.status === 'denied') setError(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setError(false);
    },5000);
    return () => {
      clearTimeout(timer);
    }
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
  
  const validator = (data: string): boolean => {
    const regex = new RegExp('^([A-Za-z0-9]){4,20}$', 'gm');
    return regex.test(data);
  }
  const validLogin = validator(login);
  const validPassword = validator(password);
  
  return (
    <>
      {!auth ? (
        <FormRegistrationStyle width={'300px'} height={'260px'}>
          <WrapperStyle>
            <HeaderStyle>Enter to the Clone Zero!</HeaderStyle>
            {!loading &&
              <>
                <Input
                  callback={onChange(setLogin)}
                  type="text"
                  text="Login"
                  placeholder="Enter login"
                  id="login"
                  value={login}
                  width="204px"
                  height="30px"
                  backgroundImage="./assets/game/ui/element_0071_Layer-73.png"
                />
                <>
                { !validLogin && <ErrorMessage
                    text={'login not valid. (min 4, max 20)'}
                    padding={0}
                    hoverColor={''}
                    margin={5}
                    backgroundColor={'transparent'}
                    color={'red'}
                    border={'none'}
                    cursor={'initial'}
                  />}
                </>
              </>
            }
            {!loading &&
              <>
                <Input
                  callback={onChange(setPassword)}
                  type="password"
                  text="Password"
                  placeholder="Enter password"
                  id="password"
                  value={password}
                  width="204px"
                  height="30px"
                  backgroundImage="./assets/game/ui/element_0071_Layer-73.png"
                />
                <>
                  { !validPassword && <ErrorMessage
                    text={'password not valid. (min 4, max 20)'}
                    padding={0}
                    hoverColor={''}
                    margin={5}
                    backgroundColor={'transparent'}
                    color={'red'}
                    border={'none'}
                    cursor={'initial'}
                  />}
                </>
              </>
            }
            {!loading &&
              <RegistrationButton
                onClick={e => {
                  submitHandler(e)
                  setLoading(true)
                }}
                status={!(validPassword && validLogin)}
                text={'Login / Registration'}
              />
            }
            {error &&
              <ErrorMessage
                text={state.message}
                padding={0}
                hoverColor={''}
                margin={5}
                backgroundColor={'transparent'}
                color={'red'}
                border={'none'}
                cursor={'initial'}
              />
            }
          </WrapperStyle>
        </FormRegistrationStyle>
      ) : (
        <FormRegistrationStyle width={'500px'} height={'300px'}>
          <WrapperStyle>
            <CreateCharacter />
          </WrapperStyle>
        </FormRegistrationStyle>
      )}
    </>
  );
}

export default FormRegistration;
