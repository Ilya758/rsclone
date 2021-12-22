import {
  FormRegistrationStyle,
  Main,
  MainWrapperBg,
  RegistrationWrapper,
} from './registration.style';
import RegistrationButton from '../buttons/RegistrationButton';
import FormRegistration from '../formRegistration/FormRegistration';

const Registration = () => {
  return (
    <Main data-offset="2" data-correction="50">
      <MainWrapperBg data-offset="0.2" data-correction="0">
        <RegistrationWrapper>
          <FormRegistrationStyle>
            <FormRegistration />
          </FormRegistrationStyle>
        </RegistrationWrapper>
      </MainWrapperBg>
      <RegistrationButton />
    </Main>
  );
};

export default Registration;
