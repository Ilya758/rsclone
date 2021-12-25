import { ButtonWrapperStyle } from './genericButton.style';
import { IGenericButton } from './genericButton.types';

const GenericButton = ({
  text,
  padding,
  hoverColor,
  margin,
  backgroundColor,
  border,
  color,
  cursor,
  letterSpacing,
}: IGenericButton) => {
  return (
    <ButtonWrapperStyle
      padding={padding}
      hoverColor={hoverColor}
      margin={margin}
      backgroundColor={backgroundColor}
      border={border}
      color={color}
      cursor={cursor}
      letterSpacing={letterSpacing}
    >
      {text}
    </ButtonWrapperStyle>
  );
};

export default GenericButton;
