import { ErrorMessageStyle } from './errorMessage.style';
import { IErrorMessage } from './errorMessage.types';

const ErrorMessage = ({
  text,
  padding,
  hoverColor,
  margin,
  backgroundColor,
  border,
  color,
  cursor,
  letterSpacing,
}: IErrorMessage) => {
  return (
    <ErrorMessageStyle
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
    </ErrorMessageStyle>
  );
};

export default ErrorMessage;
