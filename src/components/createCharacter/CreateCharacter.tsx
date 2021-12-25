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
  const init = {
    name: '',
    background: 'bg-manikin',
    profession: 'stalker',
    city: 'moscow',
    coins: 100,
  };
  const [character, setCharacter] = useState(init);
  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacter({ ...character, name: e.target.value });
  };

  return (
    <WrapperStyle>
      <RegistrationButton onClick={e => console.log(e.target)} text={'Enter'} />
      <ManikinWrapperStyle>
        <ManikinBackgroundStyle>
          <ManikinStyle />
        </ManikinBackgroundStyle>
        <PaginationButtonStyle
          background={'./assets/images/left.png'}
          backgroundHover={'./assets/images/left-hover.png'}
          margin={'0 auto 0 0'}
        />
        <PaginationButtonStyle
          background={'./assets/images/right.png'}
          backgroundHover={'./assets/images/right-hover.png'}
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
