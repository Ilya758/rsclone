import {
  FormRegistrationStyle,
  MainStyle,
  ContainerStyle,
  ButtonContainerStyle,
  RegistrationWrapperStyle,
} from './registration.style';
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
      <ButtonContainerStyle>
        <div>Наши Гитхабы</div>
      </ButtonContainerStyle>
    </MainStyle>
  );
};

export default Registration;
