import {
  FooterStyle,
  FooterWrapperStyle,
  HeaderStyle,
  RegistrationWrapperStyle,
} from './homePage.style';

import Registration from '../../components/registration/Registration';

const HomePage = () => {
  return (
    <RegistrationWrapperStyle>
      <HeaderStyle />
      <Registration />
      <FooterStyle>
        <FooterWrapperStyle />
      </FooterStyle>
    </RegistrationWrapperStyle>
  );
};

export default HomePage;
