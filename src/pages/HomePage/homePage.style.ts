import styled, { keyframes } from 'styled-components';

const changeHeightTop = keyframes`
0% {
  flex: 15;
}
99% {
  flex: 5;
}
100% {
  background-color: transparent;
}
`;

export const HeaderStyle = styled.div`
  position: relative;
  z-index: 10;
  flex: 5;
  // animation: ${changeHeightTop} 4s linear;
  min-height: 80px;
  background-image: url('./assets/registration-form/bg-line2.png'),
    url('./assets/registration-form/left-triangle2.png'),
    url('./assets/registration-form/right-triangle2.png');
  background-position-x: 33px, -0.1%, 100.1%;
  background-position-y: 100%, 100.4%, 100.4%;
  background-repeat: no-repeat;
  background-size: calc(100% - 66px) 7px, 35px 18px, 35px 18px;
`;

export const FooterStyle = styled.div`
  position: relative;
  width: 100%;
  flex: 5;
  z-index: 1;
  background-image: url('./assets/registration-form/bg-line2.png');
  background-position-x: 0;
  background-position-y: 0;
  background-repeat: no-repeat;
  background-size: 100% 9px;
`;

export const FooterWrapperStyle = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-image: url('./assets/registration-form/top-triangle-left.png'),
    url('./assets/registration-form/top-triangle-right.png');
  background-position-x: 0%, 100%;
  background-position-y: 9px, 9px;
  background-repeat: no-repeat;
  background-size: 35px 18px, 35px 18px;
`;

export const RegistrationWrapperStyle = styled.div`
  width: 100%;
  height: 100vh;
  background-color: grey;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
