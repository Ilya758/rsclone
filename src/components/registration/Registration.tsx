import {
  MainStyle,
  ContainerStyle,
  RegistrationWrapperStyle,
} from './registration.style';
import FormRegistration from '../formRegistration/FormRegistration';

const Registration = () => {
  return (
    <MainStyle>
      <ContainerStyle>
        <RegistrationWrapperStyle>
          <FormRegistration />
        </RegistrationWrapperStyle>
      </ContainerStyle>
    </MainStyle>
  );
};

export default Registration;
