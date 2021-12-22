import {ButtonWrapperStyle} from "./genericButton.style";
import {IGenericButton} from "./genericButton.types";

const GenericButton = ({text, padding, hoverColor, margin, backgroundColor, border, color, cursor}: IGenericButton) => {
  return (
    <ButtonWrapperStyle
      padding={padding}
      hoverColor={hoverColor}
      margin={margin}
      backgroundColor={backgroundColor}
      border={border}
      color={color}
      cursor={cursor}
    >
      {text}
    </ButtonWrapperStyle>
  )
};

export default GenericButton;