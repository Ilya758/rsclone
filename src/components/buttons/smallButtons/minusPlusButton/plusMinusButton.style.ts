import styled from 'styled-components';

export const PlusButtonStyle = styled.div`
  width: 13px;
  height: 13px;
  box-sizing: border-box;
  margin-right: auto;
  cursor: pointer;
  background-image: url('./assets/images/small-buttons/plus-button.svg');
  &:hover {
    background-image: url('./assets/images/small-buttons/plus-button-hover.svg');
  }
`;

export const MinusButtonStyle = styled.div`
  width: 13px;
  height: 13px;
  box-sizing: border-box;
  margin-left: auto;
  cursor: pointer;
  background-image: url('./assets/images/small-buttons/minus-button.svg');
  &:hover {
    background-image: url('./assets/images/small-buttons/minus-button-hover.svg');
  }
`;
