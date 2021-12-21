import {
  ButtonRegistration,
  FooterStyle,
  FooterWrapper,
  FormRegistration,
  HeaderStyle,
  Main,
  MainWrapper,
  MainWrapperBg,
  MainWrapperBgSecond,
  MainWrapperSecond,
  RegistrationStyle,
  RegistrationWrapper,
  RegistrationWrapperStyle,
} from './registration.style';

const Registration = () => {
  return (
    <RegistrationWrapperStyle>
      <HeaderStyle />
      <Main data-offset="2" data-correction="50">
        <MainWrapperBg data-offset="0.2" data-correction="0">
          <MainWrapperBgSecond data-offset="0.2" data-correction="95">
            <MainWrapper data-offset="0.5" data-correction="90">
              <MainWrapperSecond data-offset="0.5" data-correction="15">
                <RegistrationStyle>
                  <RegistrationWrapper>
                    <FormRegistration />
                  </RegistrationWrapper>
                </RegistrationStyle>
              </MainWrapperSecond>
            </MainWrapper>
          </MainWrapperBgSecond>
        </MainWrapperBg>
        <ButtonRegistration>Login</ButtonRegistration>
      </Main>
      <FooterStyle>
        <FooterWrapper />
      </FooterStyle>
    </RegistrationWrapperStyle>
  );
};

export default Registration;
