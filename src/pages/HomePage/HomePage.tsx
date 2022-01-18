import {
  FooterStyle,
  HeaderStyle,
  RegistrationWrapperStyle, VideoOverlayStyle
} from "./homePage.style";

import Registration from '../../components/registration/Registration';
import { useState } from 'react';

const HomePage = () => {
  const [state, setState] = useState(true);

  return state ? (
    <RegistrationWrapperStyle>
      <HeaderStyle />
      <Registration />
      <FooterStyle />
      <VideoOverlayStyle loop={true} autoPlay muted={true}>
        <source src="./assets/video/logo.mp4"
                type="video/mp4" />
      </VideoOverlayStyle>
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
