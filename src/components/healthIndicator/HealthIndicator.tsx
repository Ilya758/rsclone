import { InsideWrapperStyle, WrapperStyle } from './healthIndicator.style';
import { IHealthIndicator } from './healthIndicator.types';

const HealthIndicator = ({ minHealth, maxHealth }: IHealthIndicator) => {
  return (
    <WrapperStyle>
      <InsideWrapperStyle>{`${minHealth}/${maxHealth}`}</InsideWrapperStyle>
    </WrapperStyle>
  );
};

export default HealthIndicator;
