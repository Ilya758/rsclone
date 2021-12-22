import React from "react";
import {ButtonWrapperStyle} from "./genericButton.style";

interface IGenericButton {
  text :string,
  padding :number,
  hoverColor: string,
  margin :number,
  backgroundColor: string,
  border: string,
  color: string;
  cursor: string;
}

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