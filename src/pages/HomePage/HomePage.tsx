import {
  FooterStyle,
  FooterWrapperStyle,
  HeaderStyle,
  ButtonWrapperStyle,
  RegistrationWrapperStyle,
} from './homePage.style';

import Registration from '../../components/registration/Registration';

const HomePage = () => {
  return (
    <RegistrationWrapperStyle>
      <HeaderStyle />
      <Registration />
      <FooterStyle>
        <FooterWrapperStyle>
          <ButtonWrapperStyle>Registration</ButtonWrapperStyle>
          <ButtonWrapperStyle>Forgot password</ButtonWrapperStyle>
        </FooterWrapperStyle>
      </FooterStyle>
    </RegistrationWrapperStyle>
  );
};

export default HomePage;
