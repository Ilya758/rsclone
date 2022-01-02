import Select from '../inputs/select/Select';
import { ChangeEvent, useEffect } from "react";
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
  LocationHeaderStyle,
} from './createCharacter.style';
import Input from '../inputs/textField/Input';
import { useState } from 'react';
import { CITIES_ARRAY } from '../../constants/bgCities';
import { BG_ARRAY } from '../../constants/bgManikins';
// import Skills from '../skills/Skills';
import LevelProfStats from '../levelProfStats/LevelProfStats';
import FreePointsField from '../freePointsField/FreePointsField';
import HealthIndicator from '../healthIndicator/HealthIndicator';
import CoinIndicator from '../coinIndicator/CoinIndicator';
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { setStoreCharacter, storeCharacter } from "../../stores/reducers/characterReducer";
import { Link } from "react-router-dom";

function CreateCharacter() {
  const char = useAppSelector((state) => state.character);
  const [character, setCharacter] = useState(() => char);
  const options = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const calculated = JSON.parse(JSON.stringify(character));
    calculated.userId = options;
    setCharacter(calculated)
  }, []);
  console.log(character);

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

  // const handleStatsChange = (skill: string, type: string): void => {
  //   let prevValue = character.skills[skill as keyof typeof character.skills];
  //   let newStats = character.stats;
  //   if (type === 'plus') {
  //     newStats -= 1;
  //     prevValue += 1;
  //   } else {
  //     newStats += 1;
  //     prevValue -= 1;
  //   }
  //   setCharacter({
  //     ...character,
  //     stats: newStats,
  //     skills: { ...character.skills, [skill]: prevValue },
  //   });
  // };

  const handleSettings = <T extends HTMLSelectElement | HTMLInputElement>(
    e: ChangeEvent<T>,
    type: string
  ) => {
    setCharacter({ ...character, [type]: e.target.value });
  };

  return (
    <WrapperStyle>
      <Link onClick={() => {
        dispatch(setStoreCharacter(character));
        dispatch(storeCharacter(character));
        console.log(char);
      }} to="/game"><h1>GAME</h1></Link>
      <BGWrapperStyle width={'122px'} height={'100%'}>
        <BackgroundStyle
          background={`./assets/images/bg-manikins/${character.background}`}
          width={'118px'}
          height={'206px'}
        >
          <ManikinStyle />
        </BackgroundStyle>
        <PaginationButtonStyle
          background={'./assets/images/small-icons/left.png'}
          backgroundHover={'./assets/images/small-icons/left-hover.png'}
          margin={'0 auto 0 0'}
          onClick={() =>
            changeBackgroundHandler('left', BG_ARRAY, 'background')
          }
        />
        <PaginationButtonStyle
          background={'./assets/images/small-icons/right.png'}
          backgroundHover={'./assets/images/small-icons/right-hover.png'}
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
          height="27px"
          backgroundImage="./assets/images/bg-level.png"
        />
        <Select
          options={['stalker', 'miner', 'corsair']}
          id={'profession'}
          name={'Profession'}
          changeHandle={e => handleSettings(e, 'profession')}
        />
        <LocationHeaderStyle>Start location</LocationHeaderStyle>
        <BGWrapperStyle width={'95%'} height={'130px'}>
          <BackgroundStyle
            background={`./assets/images/cities/${character.city}`}
            width={'100%'}
            height={'85px'}
          >
            <CityLabelStyle>{getNameFromUrl(character.city)}</CityLabelStyle>
          </BackgroundStyle>

          <PaginationButtonStyle
            background={'./assets/images/small-icons/left.png'}
            backgroundHover={'./assets/images/small-icons/left-hover.png'}
            margin={'0 auto 0 0'}
            onClick={() =>
              changeBackgroundHandler('left', CITIES_ARRAY, 'city')
            }
          />
          <PaginationButtonStyle
            background={'./assets/images/small-icons/right.png'}
            backgroundHover={'./assets/images/small-icons/right-hover.png'}
            onClick={() =>
              changeBackgroundHandler('right', CITIES_ARRAY, 'city')
            }
          />
        </BGWrapperStyle>
      </ButtonWrapperStyle>
      <SettingsWrapperStyle>
        <LevelProfStats
          level={1}
          profession={character.profession}
          experience={0}
        />

        <HealthIndicator minHealth={40} maxHealth={40} />

        {/*<Skills*/}
        {/*  data={character}*/}
        {/*  handleChange={handleStatsChange}*/}
        {/*  Minus={character.agility}*/}
        {/*  isShowStatChanger={character.stats >= 1}*/}
        {/*/>*/}
        <FreePointsField stats={character.stats} />
        <CoinIndicator coins={character.coins} />
      </SettingsWrapperStyle>
    </WrapperStyle>
  );
}

export default CreateCharacter;
