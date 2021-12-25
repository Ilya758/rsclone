import { PlusButtonStyle, MinusButtonStyle } from './plusMinusButton.style';
import { ISmallButton } from './plusMinusButton.types';

const SmallButton = ({ type, changeHandle }: ISmallButton) => {
  if (type === 'plus') {
    return <PlusButtonStyle onClick={changeHandle} />;
  } else {
    return <MinusButtonStyle onClick={changeHandle} />;
  }
};

export default SmallButton;
