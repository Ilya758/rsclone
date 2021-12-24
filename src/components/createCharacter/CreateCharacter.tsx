import RegistrationButton from '../buttons/RegistrationButton';
import Select from '../inputs/select/Select';
import {
  WrapperStyle,
  ManikinBackgroundStyle,
  ManikinStyle,
  ButtonWrapperStyle,
} from './createCharacter.style';

function CreateCharacter() {
  return (
    <WrapperStyle>
      <RegistrationButton onClick={e => console.log(e.target)} text={'Enter'} />
      <ManikinBackgroundStyle>
        <ManikinStyle />
      </ManikinBackgroundStyle>
      <ButtonWrapperStyle>
        <Select options={['man', 'woman']} id={'sexSelector'} name={'sex'} />
        <Select
          options={['bg1', 'bg2', 'bg3', 'bg4', 'bg5']}
          id={'sexSelector'}
          name={'background'}
        />
        <Select
          options={['NewMoscow', 'NewYork', 'LasPetersburg']}
          id={'StartCity'}
          name={'City'}
        />
        <Select
          options={['Stalker', 'Miner', 'Corsair']}
          id={'Profession'}
          name={'Profession'}
        />
      </ButtonWrapperStyle>

      <div className="inventory--item__bag"></div>
      <div className="inventory--item__top">
        <div className="inventory--button inventory--button__character"></div>
      </div>
      <ul className="inventory--list">
        <li
          className="
          inventory--item inventory--item__active inventory--item__character
            "
        >
          <button className="inventory--button inventory--button__character"></button>
        </li>
      </ul>
      <div className="money--info">
        15<span className="money--info__span">монет</span>
      </div>
      <div className="inventory--info"></div>
    </WrapperStyle>
  );
}

export default CreateCharacter;
