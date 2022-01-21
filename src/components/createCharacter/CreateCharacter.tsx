import { useEffect } from 'react';
import {
  WrapperStyle,
  BackgroundStyle,
  BGWrapperStyle,
  PaginationButtonStyle,
  LinkWrapperStyle,
  PaginationWrapperStyle,
} from './createCharacter.style';
import { useState } from 'react';
import { BG_ARRAY } from '../../constants/bgManikins';
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
  const playerName = useAppSelector((state) => state.user.login);

  useEffect(() => {
    const calculated = JSON.parse(JSON.stringify(character));
    calculated.userId = options;
    setCharacter(calculated);
  }, []);

  const changeBackgroundHandler = (
    direction: string,
    array: string[],
    type: string
  ) => {
    let index =
      type === 'background'
        ? array.indexOf(character.background)
        : array.indexOf(character.city);
    index = direction === 'left' ? (index -= 1) : (index += 1);
    if (index < 0) index = array.length - 1;
    if (index > array.length - 1) index = 0;
    setCharacter({ ...character, [type]: array[index] });
  };

  // const handleSettings = <T extends HTMLSelectElement | HTMLInputElement>(
  //   e: ChangeEvent<T>,
  //   type: string
  // ) => {
  //   setCharacter({ ...character, [type]: e.target.value });
  // };

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
        <h3>{`Welcome ${playerName}`}</h3>
        <BackgroundStyle
          background={`./assets/game/icons/${character.background}`}
          width={"128px"}
          height={"128px"}
          margin={"5px 0px 0px 0px"}
          />
        <PaginationWrapperStyle>
          <PaginationButtonStyle
            background={'./assets/game/ui/element_0142_Layer-144.png'}
            margin={'0 auto 0 0'}
            onClick={() =>
              changeBackgroundHandler('left', BG_ARRAY, 'background')
            }
          />
          <PaginationButtonStyle
            background={'./assets/game/ui/element_0143_Layer-145.png'}
            onClick={() =>
              changeBackgroundHandler('right', BG_ARRAY, 'background')
            }
          />
        </PaginationWrapperStyle>
      </BGWrapperStyle>
    </WrapperStyle>
  );
}

export default CreateCharacter;
