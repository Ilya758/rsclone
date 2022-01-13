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
  background-image: url('./assets/game/ui/element_0048_Layer-50.png'),
    url('./assets/game/ui/element_0041_Layer-43.png'),
    url('./assets/game/ui/element_0038_Layer-40.png'),
    url('./assets/game/ui/element_0104_Layer-106.png');
  background-position-x: 33px, -0.1%, 100.1%, 50%;
  background-position-y: 100%, 102.4%, 102.4%, 102.4%;
  background-repeat: no-repeat;
  background-size: calc(100% - 66px) 9px, 49px 20px, 49px 20px, 680px 66px;
`;

export const FooterStyle = styled.div`
  position: relative;
  width: 100%;
  flex: 5;
  z-index: 1;
  background-image: url('./assets/game/ui/element_0109_Layer-111.png');
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 0;
  background-size: 564px 40px;
`;

export const RegistrationWrapperStyle = styled.div`
  width: 100%;
  height: 100vh;
  background-color: grey;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
