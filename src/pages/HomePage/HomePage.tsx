import {
  FooterStyle,
  FooterWrapper,
  HeaderStyle,
  ButtonWrapper,
  RegistrationWrapperStyle,
} from './homePage.style';

import Registration from '../../components/registration/Registration';

const HomePage = () => {
  return (
    <RegistrationWrapperStyle>
      <HeaderStyle />
      <Registration />
      <FooterStyle>
        <FooterWrapper>
          <ButtonWrapper>Registration</ButtonWrapper>
          <ButtonWrapper>Forgot password</ButtonWrapper>
        </FooterWrapper>
      </FooterStyle>
    </RegistrationWrapperStyle>
  );
};

export default HomePage;
