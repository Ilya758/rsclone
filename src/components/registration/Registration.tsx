import {
  FormRegistrationStyle,
  MainStyle,
  ContainerStyle,
  ButtonContainerStyle,
  RegistrationWrapperStyle,
} from './registration.style';
import RegistrationButton from '../buttons/RegistrationButton';
import FormRegistration from '../formRegistration/FormRegistration';
// import CreateCharacter from '../createCharacter/CreateCharacter';


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
