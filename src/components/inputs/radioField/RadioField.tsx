import { useState } from 'react';
import {
  CustomLabelStyle,
  FieldsetStyle,
  InputStyle,
  InputWrapperStyle,
  LabelWrapperStyle,
} from './radioField.style';

const RadioField = () => {
  const initial = [
    {
      name: 'stalker',
      isChecked: false,
      background: './assets/svg/stalker.svg',
    },
    { name: 'miner', isChecked: false, background: './assets/svg/miner.svg' },
    {
      name: 'corsair',
      isChecked: false,
      background: './assets/svg/corsair.svg',
    },
  ];
  const [profession, setProfession] = useState(initial);
  const onChange = (name: string) => {
    setProfession(
      initial.map(el => (el.name === name ? { ...el, isChecked: true } : el))
    );
  };
  return (
    <FieldsetStyle>
      {profession.map(prof => {
        return (
          <InputWrapperStyle key={prof.name}>
            {prof.isChecked && (
              <CustomLabelStyle backgroundColor={prof.background} />
            )}
            <InputStyle
              type="radio"
              name="profession"
              id={prof.name}
              value={prof.name}
              onChange={() => onChange(prof.name)}
              checked={prof.isChecked}
            />
            <LabelWrapperStyle htmlFor={prof.name}>
              {prof.name}
            </LabelWrapperStyle>
          </InputWrapperStyle>
        );
      })}
    </FieldsetStyle>
  );
};

export default RadioField;
