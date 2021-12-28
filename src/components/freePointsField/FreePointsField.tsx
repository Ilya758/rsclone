import { WrapperStyle, TextStyle } from './freePointsField.style';
import { IFreePointsField } from './freePointsField.types';

const FreePointsField = ({ stats }: IFreePointsField) => {
  return (
    <WrapperStyle>
      {stats}
      <TextStyle>Free-coins</TextStyle>
    </WrapperStyle>
  );
};

export default FreePointsField;
