import {
  MainStyle,
  ContainerStyle,
  ButtonContainerStyle,
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
      <ButtonContainerStyle>
        <div>Наши Гитхабы</div>
      </ButtonContainerStyle>
    </MainStyle>
  );
};

export default Registration;
