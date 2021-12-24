import {
  FooterStyle,
  FooterWrapperStyle,
  HeaderStyle,
  RegistrationWrapperStyle,
} from './homePage.style';

import Registration from '../../components/registration/Registration';
import { useState } from 'react';

const HomePage = () => {
  const [state, setState] = useState(true);

  return state ? (
    <RegistrationWrapperStyle>
      <HeaderStyle />
      <Registration />
      <FooterStyle>
        <FooterWrapperStyle />
      </FooterStyle>
    </RegistrationWrapperStyle>
  ) : (
    <button
      onClick={() => {
        setState(true);
      }}
    >
      Click
    </button>
  );
};

export default HomePage;
