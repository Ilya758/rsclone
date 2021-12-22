import styled from 'styled-components';

export const HeaderStyle = styled.div`
  position: relative;
  z-index: 10;
  height: calc(100% - 730px);
  min-height: 80px;
  background-image: url('./assets/registration-form/84.png'),
    url('./assets/registration-form/95.png'),
    url('./assets/registration-form/101.png');
  background-position-x: 33px, -0.1%, 100.1%;
  background-position-y: 100%, 100.4%, 100.4%;
  background-repeat: no-repeat;
  background-size: calc(100% - 66px) 7px, 35px 18px, 35px 18px;
`;

export const FooterStyle = styled.div`
  width: 100%;
  background-image: url('./assets/registration-form/84.png');
  background-position-x: 0;
  background-position-y: 0;
  background-repeat: no-repeat;
  background-size: 100% 9px;
`;

export const FooterWrapperStyle = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-image: url('./assets/registration-form/38.png'),
    url('./assets/registration-form/35.png');
  background-position-x: 0%, 100%;
  background-position-y: 9px, 9px;
  background-repeat: no-repeat;
  background-size: 35px 18px, 35px 18px;
`;

export const RegistrationWrapperStyle = styled.div`
  width: 100%;
  height: 100vh;
  background-color: grey;
`;
