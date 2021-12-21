import styled from 'styled-components';

export const Main = styled.main`
  position: relative;
  z-index: 5;
  width: 100%;
  height: calc(100% - 600px);
  box-sizing: border-box;
  background-image: url('./assets/registration-form/registration-bg.jpg');
  background-size: 110%;
`;

export const MainWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-image: url('./assets/registration-form/139.png');
  background-position-x: 80%;
  background-repeat: no-repeat;
  background-size: 227px 421px;
`;

export const MainWrapperSecond = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-image: url('./assets/registration-form/148.png');
  background-position-y: 50%;
  background-position-x: 15%;
  background-repeat: no-repeat;
  background-size: 353px 447px;
`;

export const MainWrapperBg = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-image: url('./assets/registration-form/113.png');
  background-position-x: 5%;
  background-repeat: no-repeat;
  background-size: 582px 393px;
`;

export const MainWrapperBgSecond = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-image: url('./assets/registration-form/116.png');
  background-position-x: 85%;
  background-position-y: 100%;
  background-repeat: no-repeat;
  background-size: 329px 60px;
`;

export const ButtonRegistration = styled.button`
  position: absolute;
  z-index: 15;
  bottom: -13px;
  left: calc(50% - 154px);
  width: 308px;
  height: 69px;
  border: none;
  background-color: transparent;
  background-image: url('./assets/registration-form/50.png'),
    url('./assets/registration-form/281.svg');
  background-position-x: 50%, 50%;
  background-position-y: 50%, 50%;
  background-repeat: no-repeat;
  background-size: cover, 60%;
  cursor: pointer;
  outline: none;
  &:hover {
    background-image: url('./assets/registration-form/50.png'),
      url('./assets/registration-form/281.svg'),
      url('./assets/registration-form/283.svg');
    background-position-x: 30%, 50%, 50%;
    background-position-y: 30%, 50%, 30%;
    background-size: cover, 60%, 60%;
  }
`;

export const FormRegistration = styled.div`
  width: 318px;
  height: 230px;
  background-image: url('./assets/registration-form/form.png'),
    url('./assets/registration-form/form-bg.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%, 95% 95%;
  background-position-x: 50%;
  background-position-y: 50%;
`;

export const RegistrationStyle = styled.div`
  width: 100%;
  height: 100%;
`;

export const RegistrationWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('./assets/registration-form/47.png'),
    url('./assets/registration-form/32.png'),
    url('./assets/registration-form/29.png');
  background-position-x: 29px, 0%, 100%;
  background-position-y: 100%, 100%, 100%;
  background-repeat: no-repeat;
  background-size: calc(100% - 58px) 9px, 29px 19px, 29px 19px;
`;

export const HeaderStyle = styled.div`
  position: relative;
  z-index: 10;
  height: 300px;
  background-color: #000000;
  background-image: url('./assets/registration-form/84.png'),
    url('./assets/registration-form/95.png'),
    url('./assets/registration-form/101.png');
  background-position-x: 35px, 0%, 100%;
  background-position-y: 100%, 100%, 100%;
  background-repeat: no-repeat;
  background-size: calc(100% - 69px) 7px, 35px 18px, 35px 18px;
  &::before {
    position: absolute;
    bottom: -35px;
    left: calc(50% - 300px);
    display: block;
    width: 601px;
    height: 100px;
    background-image: url('./assets/registration-form/92.png'),
      url('./assets/registration-form/89.png');
    background-size: 601px 99px, 600px 90px;
    font: 500 40px Arial, sans-serif;
    color: #fff;
    content: 'CloneZero';
    line-height: 100px;
    text-align: center;
  }
`;

export const FooterStyle = styled.div`
  width: 100%;
  height: 300px;
  background-color: #000000;
  background-image: url('./assets/registration-form/84.png');
  background-position-x: 0;
  background-position-y: 0;
  background-repeat: no-repeat;
  background-size: 100% 9px;
`;

export const FooterWrapper = styled.div`
  height: 300px;
  height: 100%;
  background-image: url('./assets/registration-form/44.png'),
    url('./assets/registration-form/38.png'),
    url('./assets/registration-form/35.png');
  background-position-x: 50%, 0%, 100%;
  background-position-y: -5px, 9px, 9px;
  background-repeat: no-repeat;
  background-size: 587px 68px, 35px 18px, 35px 18px;
`;

export const RegistrationWrapperStyle = styled.div`
  width: 100%;
  height: 100vh;
`;
