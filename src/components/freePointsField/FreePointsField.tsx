import { WrapperStyle } from './freePointsField.style';
import { IFreePointsField } from './freePointsField.types';

const FreePointsField = ({ stats }: IFreePointsField) => {
  return <WrapperStyle>{`Free points: ${stats}`}</WrapperStyle>;
};

export default FreePointsField;
