import RegistrationButton from '../buttons/RegistrationButton';
import Select from '../inputs/select/Select';
import { ChangeEvent } from 'react';
import {
  WrapperStyle,
  ManikinBackgroundStyle,
  ManikinStyle,
  ButtonWrapperStyle,
  ManikinWrapperStyle,
  PaginationButtonStyle,
  LabelStyle,
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
  const init = {
    name: '',
    background: './assets/images/bg-manikins/bg-manikin.jpg',
    profession: 'stalker',
    city: 'moscow',
    coins: 100,
  };
  const [character, setCharacter] = useState(init);

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacter({ ...character, name: e.target.value });
  };

  const changeProfessionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCharacter({ ...character, profession: e.target.value });
    console.log(character);
  };

  const changeBackgroundHandler = (direction: string) => {
    let index = bgArray.indexOf(character.background);
    index = direction === 'left' ? (index -= 1) : (index += 1);
    if (index < 0) index = bgArray.length - 1;
    if (index > bgArray.length - 1) index = 0;
    setCharacter({ ...character, background: bgArray[index] });
    console.log(bgArray.indexOf('./assets/images/bg-manikins/bg-manikin3.jpg'));
    console.log(character);
  };

  return (
    <WrapperStyle>
      <RegistrationButton onClick={e => console.log(e.target)} text={'Enter'} />
      <ManikinWrapperStyle>
        <ManikinBackgroundStyle background={character.background}>
          <ManikinStyle />
        </ManikinBackgroundStyle>
        <PaginationButtonStyle
          background={'./assets/images/left.png'}
          backgroundHover={'./assets/images/left-hover.png'}
          margin={'0 auto 0 0'}
          onClick={() => changeBackgroundHandler('left')}
        />
        <PaginationButtonStyle
          background={'./assets/images/right.png'}
          backgroundHover={'./assets/images/right-hover.png'}
          onClick={() => changeBackgroundHandler('right')}
        />
      </ManikinWrapperStyle>

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
      </ButtonWrapperStyle>

      <div className="inventory--item__bag"></div>
      <div className="inventory--item__top">
        <div className=""></div>
      </div>
      <ul className="inventory--list">
        <li className=""></li>
      </ul>
      <div className="money--info">
        15<span className="money--info__span">монет</span>
      </div>
      <div className="inventory--info"></div>
    </WrapperStyle>
  );
}

export default CreateCharacter;
