import { SelectStyle, LabelStyle } from './select.style';
import { ISelect } from './select.types';
const Select = ({ options, id, name }: ISelect) => {
  return (
    <>
      <LabelStyle htmlFor={id}>{name}</LabelStyle>
      <SelectStyle name={name} id={id}>
        {options.map((optionName, index) => (
          <option value={optionName} key={index}>
            {optionName}
          </option>
        ))}
      </SelectStyle>
    </>
  );
};

export default Select;
