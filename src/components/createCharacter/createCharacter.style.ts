import styled, { keyframes } from 'styled-components';
import { IGenericButton } from '../genericButton/genericButton.types';

const showForm = keyframes`
  0% {
    opacity: 0;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const WrapperStyle = styled.form`
  width: 100%;
  height: 100%;
  animation: ${showForm} 2.2s linear;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonWrapperStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 170px;
  height: 100%;
  align-items: flex-start;
  flex-direction: column;
`;

export const LabelStyle = styled.div`
  position: absolute;
  top: 3px;
  left: 0px;
  width: 27px;
  height: 14px;
  box-sizing: border-box;
  background-image: url('./assets/images/name.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

export const BGWrapperStyle = styled.div<IGenericButton>`
  display: flex;
  justify-content: flex-start;
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  width: ${props => props.width};
  height: ${props => props.height};
  align-items: space-between;
  align-content: space-between;
  flex-wrap: wrap;
`;

export const PaginationButtonStyle = styled.div<IGenericButton>`
  width: 27px;
  height: 14px;
  margin: ${props => props.margin};
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  :hover {
    background-image: url(${props => props.backgroundHover});
  }
`;

export const BackgroundStyle = styled.div<IGenericButton>`
  left: calc(50% - 100px);
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(75, 82, 65, 1);
  border-radius: 7px;
`;

export const CityLabelStyle = styled.div`
  position: absolute;
  bottom: 20px;
`;

export const ManikinStyle = styled.div`
  width: 90%;
  height: 90%;
  background-image: url('../assets/images/manikin.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
`;
