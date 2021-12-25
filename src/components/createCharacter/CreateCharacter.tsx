import RegistrationButton from '../buttons/RegistrationButton';
import Select from '../inputs/select/Select';
import { ChangeEvent } from 'react';
import {
  WrapperStyle,
  BackgroundStyle,
  ManikinStyle,
  ButtonWrapperStyle,
  BGWrapperStyle,
  PaginationButtonStyle,
  LabelStyle,
  CityLabelStyle,
} from './createCharacter.style';
import Input from '../inputs/textField/Input';
import { useState } from 'react';

function CreateCharacter() {
  const bgArray = [
    './assets/images/bg-manikins/bg-manikin.jpg',
    './assets/images/bg-manikins/bg-manikin2.jpg',
    './assets/images/bg-manikins/bg-manikin3.jpg',
    './assets/images/bg-manikins/bg-manikin4.jpg',
    './assets/images/bg-manikins/bg-manikin5.jpg',
  ];
  const citiesArray = [
    './assets/images/cities/moscow.jpg',
    './assets/images/cities/new-york.jpg',
    './assets/images/cities/saint-petersburg.jpg',
  ];

  const init = {
    name: '',
    background: './assets/images/bg-manikins/bg-manikin.jpg',
    profession: 'stalker',
    city: './assets/images/cities/moscow.jpg',
    coins: 100,
  };
  const [character, setCharacter] = useState(init);

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacter({ ...character, name: e.target.value });
  };

  const changeProfessionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCharacter({ ...character, profession: e.target.value });
  };

  const getNameFromUrl = (url: string) => {
    return url.split('/')[4].split('.')[0];
  };

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

  return (
    <WrapperStyle>
      <RegistrationButton onClick={e => console.log(e.target)} text={'Enter'} />
      <BGWrapperStyle width={'122px'} height={'100%'}>
        <BackgroundStyle
          background={character.background}
          width={'118px'}
          height={'206px'}
        >
          <ManikinStyle />
        </BackgroundStyle>
        <PaginationButtonStyle
          background={'./assets/images/left.png'}
          backgroundHover={'./assets/images/left-hover.png'}
          margin={'0 auto 0 0'}
          onClick={() => changeBackgroundHandler('left', bgArray, 'background')}
        />
        <PaginationButtonStyle
          background={'./assets/images/right.png'}
          backgroundHover={'./assets/images/right-hover.png'}
          onClick={() =>
            changeBackgroundHandler('right', bgArray, 'background')
          }
        />
      </BGWrapperStyle>

      <ButtonWrapperStyle>
        <LabelStyle />
        <Input
          callback={changeNameHandler}
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
          changeHandle={changeProfessionHandler}
        />
        <div>Start location</div>
        <BGWrapperStyle width={'95%'} height={'130px'}>
          <BackgroundStyle
            background={character.city}
            width={'100%'}
            height={'85px'}
          >
            <CityLabelStyle>{getNameFromUrl(character.city)}</CityLabelStyle>
          </BackgroundStyle>

          <PaginationButtonStyle
            background={'./assets/images/left.png'}
            backgroundHover={'./assets/images/left-hover.png'}
            margin={'0 auto 0 0'}
            onClick={() => changeBackgroundHandler('left', citiesArray, 'city')}
          />
          <PaginationButtonStyle
            background={'./assets/images/right.png'}
            backgroundHover={'./assets/images/right-hover.png'}
            onClick={() =>
              changeBackgroundHandler('right', citiesArray, 'city')
            }
          />
        </BGWrapperStyle>
      </ButtonWrapperStyle>
      <div></div>
      <div></div>
      <div></div>
    </WrapperStyle>
  );
}

export default CreateCharacter;
