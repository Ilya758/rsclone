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
  justify-content: flex-start;
  width: 170px;
  height: 236px;
  margin: 10px 0px;
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

export const ManikinWrapperStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 122px;
  height: 236px;
  align-items: space-between;
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

export const ManikinBackgroundStyle = styled.div`
  left: calc(50% - 100px);
  width: 118px;
  height: 206px;
  background-image: url('./assets/images/bg-manikin2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(75, 82, 65, 1);
  border-radius: 7px;
`;

export const ManikinStyle = styled.div`
  width: 90%;
  height: 90%;
  background-image: url('../assets/images/manikin.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
`;

// .inventory--list {
//   width: 1px;
//   height: 1px;
//   box-sizing: border-box;
// }

// .inventory--item {
//   position: absolute;
//   left: -2%;
//   width: 41px;
//   height: 44px;
//   background-image: url("../assets/images/1522.png");
//   background-repeat: no-repeat;
//   background-size: cover;
//   cursor: pointer;
//   list-style: none;
// }

// .button--close {
//   position: absolute;
//   z-index: 3;
//   top: 20px;
//   right: 16px;
//   display: block;
//   width: 19px;
//   height: 19px;
//   border: none;
//   background-color: transparent;
//   background-image: url("../assets/images/close.png");
//   background-repeat: no-repeat;
//   background-size: cover;
//   cursor: pointer;
//   outline: none;
// }

// .inventory--info,
// .inventory--bag {
//   display: flex;
//   width: 190px;
//   height: 300px;
//   margin-top: 45px;
//   margin-right: auto;
// }

// .inventory--bag {
//   width: 230px;
//   height: 270px;
//   box-sizing: border-box;
//   padding: 5px;
//   border-bottom: 2px solid rgb(60, 53, 43);
//   margin-right: 20px;
// }

// .money--info {
//   position: absolute;
//   right: 20px;
//   bottom: 50px;
//   width: 230px;
//   height: 50px;
//   box-sizing: border-box;
//   padding-left: 50px;
//   border: 1px solid rgb(60, 53, 43);
//   background-image: url("../assets/images/coin.png");
//   background-position: 10px 40%;
//   background-repeat: no-repeat;
//   background-size: 15%;
//   text-align: center;
// }

// .money--info__span {
//   padding-left: 5px;
// }
