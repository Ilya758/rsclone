import { WrapperStyle, TextStyle } from './coinIndicator.style';
import { ICoinIndicator } from './coinIndicator.types';

const CoinIndicator = ({ coins }: ICoinIndicator) => {
  return (
    <WrapperStyle>
      {coins}
      <TextStyle>Coins</TextStyle>
    </WrapperStyle>
  );
};

export default CoinIndicator;
