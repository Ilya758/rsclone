import { SelectStyle, LabelStyle } from './select.style';
import { ISelect } from './select.types';
const Select = ({ options, id, name, changeHandle }: ISelect) => {
  return (
    <>
      <LabelStyle htmlFor={id}>{name}</LabelStyle>
      <SelectStyle name={name} id={id} onChange={e => changeHandle(e)}>
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
