import {
  FormRegistrationStyle,
  MainStyle,
  ContainerStyle,
  ButtonWrapperStyle,
  ButtonContainerStyle,
  RegistrationWrapperStyle,
} from './registration.style';
import RegistrationButton from '../buttons/RegistrationButton';
import FormRegistration from '../formRegistration/FormRegistration';

const Registration = () => {
  return (
    <MainStyle data-offset="2" data-correction="50">
      <ContainerStyle data-offset="0.2" data-correction="0">
        <RegistrationWrapperStyle>
          <FormRegistrationStyle>
            <FormRegistration />
          </FormRegistrationStyle>
        </RegistrationWrapperStyle>
      </ContainerStyle>
      <RegistrationButton />
      <ButtonContainerStyle>
        <ButtonWrapperStyle>Registration</ButtonWrapperStyle>
        <ButtonWrapperStyle>Enter the World</ButtonWrapperStyle>
      </ButtonContainerStyle>
    </MainStyle>
  );
};

export default Registration;
