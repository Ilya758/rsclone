import { useEffect } from 'react';
import {
  WrapperStyle,
  BackgroundStyle,
  BGWrapperStyle,
  LinkWrapperStyle,
  HeaderStyle,
} from './createCharacter.style';
import { useState } from 'react';
import HelpButton from '../buttons/helpButton/HelpButton';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  setStoreCharacter,
  storeCharacter,
} from '../../stores/reducers/characterReducer';
import LinkButton from '../buttons/linkButton/LinkButton';

function CreateCharacter() {
  const char = useAppSelector(state => state.character);
  const [character, setCharacter] = useState(() => char);
  const options = useAppSelector(state => state.user.userId);
  const dispatch = useAppDispatch();
  const playerName = useAppSelector(state => state.user.login);

  useEffect(() => {
    const calculated = JSON.parse(JSON.stringify(character));
    calculated.userId = options;
    setCharacter(calculated);
  }, []);

  return (
    <WrapperStyle>
      <LinkWrapperStyle>
        <LinkButton
          text={'Game'}
          address={'/game'}
          onClick={() => {
            dispatch(setStoreCharacter(character));
            dispatch(storeCharacter(character));
          }}
        />
        <LinkButton
          text={'Arena'}
          address={'/multiplayer'}
          onClick={() => {
            console.log('arena');
          }}
        />
        <LinkButton
          text={'Logout'}
          address={'/'}
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
        />
      </LinkWrapperStyle>
      <BGWrapperStyle>
        <HeaderStyle>{`Welcome, ${playerName}`}</HeaderStyle>
        <BackgroundStyle
          background={`./assets/game/icons/${character.background}`}
          width={'128px'}
          height={'128px'}
          margin={'15px 0px 0px 0px'}
        />
      </BGWrapperStyle>
      <HelpButton />
    </WrapperStyle>
  );
}

export default CreateCharacter;
