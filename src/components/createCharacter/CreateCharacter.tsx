import RegistrationButton from '../buttons/registrationButton/RegistrationButton';
import Select from '../inputs/select/Select';
import { ChangeEvent } from 'react';
import { getNameFromUrl } from '../../utils/getNameFromUrl';
import {
  WrapperStyle,
  BackgroundStyle,
  ManikinStyle,
  ButtonWrapperStyle,
  BGWrapperStyle,
  PaginationButtonStyle,
  LabelStyle,
  CityLabelStyle,
  SettingsWrapperStyle,
} from './createCharacter.style';
import Input from '../inputs/textField/Input';
import { useState } from 'react';
import { CITIES_ARRAY } from '../../constants/bgCities';
import { BG_ARRAY } from '../../constants/bgManikins';
import Skills from '../skills/Skills';
import LevelProfStats from '../levelProfStats/LevelProfStats';
import { ICharacterType } from './createCharacter.type';

function CreateCharacter() {
  const init: ICharacterType = {
    name: '',
    background: 'bg-manikin1.jpg',
    profession: 'stalker',
    city: 'moscow.jpg',
    coins: 100,
  };
  const [character, setCharacter] = useState(init);

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

  const handleSettings = <T extends HTMLSelectElement | HTMLInputElement>(
    e: ChangeEvent<T>,
    type: string
  ) => {
    setCharacter({ ...character, [type]: e.target.value });
  };

  return (
    <WrapperStyle>
      <RegistrationButton onClick={e => console.log(e.target)} text={'Enter'} />
      <BGWrapperStyle width={'122px'} height={'100%'}>
        <BackgroundStyle
          background={`./assets/images/bg-manikins/${character.background}`}
          width={'118px'}
          height={'206px'}
        >
          <ManikinStyle />
        </BackgroundStyle>
        <PaginationButtonStyle
          background={'./assets/images/left.png'}
          backgroundHover={'./assets/images/left-hover.png'}
          margin={'0 auto 0 0'}
          onClick={() =>
            changeBackgroundHandler('left', BG_ARRAY, 'background')
          }
        />
        <PaginationButtonStyle
          background={'./assets/images/right.png'}
          backgroundHover={'./assets/images/right-hover.png'}
          onClick={() =>
            changeBackgroundHandler('right', BG_ARRAY, 'background')
          }
        />
      </BGWrapperStyle>

      <ButtonWrapperStyle>
        <LabelStyle />
        <Input
          callback={e => handleSettings(e, 'name')}
          type="text"
          text={character.name}
          placeholder="Enter name"
          id="name"
          width="164px"
          height="27.2px"
          backgroundImage="./assets/images/360.png"
        />
        <Select
          options={['stalker', 'miner', 'corsair']}
          id={'profession'}
          name={'Profession'}
          changeHandle={e => handleSettings(e, 'profession')}
        />
        <div>Start location</div>
        <BGWrapperStyle width={'95%'} height={'130px'}>
          <BackgroundStyle
            background={`./assets/images/cities/${character.city}`}
            width={'100%'}
            height={'85px'}
          >
            <CityLabelStyle>{getNameFromUrl(character.city)}</CityLabelStyle>
          </BackgroundStyle>

          <PaginationButtonStyle
            background={'./assets/images/left.png'}
            backgroundHover={'./assets/images/left-hover.png'}
            margin={'0 auto 0 0'}
            onClick={() =>
              changeBackgroundHandler('left', CITIES_ARRAY, 'city')
            }
          />
          <PaginationButtonStyle
            background={'./assets/images/right.png'}
            backgroundHover={'./assets/images/right-hover.png'}
            onClick={() =>
              changeBackgroundHandler('right', CITIES_ARRAY, 'city')
            }
          />
        </BGWrapperStyle>
      </ButtonWrapperStyle>
      <SettingsWrapperStyle>
        <Skills data={[15, 12, 13, 15, 16, 17]} />
        <LevelProfStats data={[5]} />
      </SettingsWrapperStyle>
    </WrapperStyle>
  );
}

export default CreateCharacter;
