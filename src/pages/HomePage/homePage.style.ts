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
  background-image: url('./assets/registration-form/84.png');
  background-position-x: 0;
  background-position-y: 0;
  background-repeat: no-repeat;
  background-size: 100% 9px;
`;

export const FooterWrapperStyle = styled.div`
  height: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
  background-color: grey;
`;

export const ButtonWrapperStyle = styled.button`
  padding: 5px;
  margin: 18px 50px;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
