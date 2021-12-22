import {
  FormRegistrationStyle,
  MainStyle,
  ContainerStyle,
  ButtonContainerStyle,
  RegistrationWrapperStyle,
} from './registration.style';
import RegistrationButton from '../buttons/RegistrationButton';
import FormRegistration from '../formRegistration/FormRegistration';
import GenericButton from '../genericButton/GenericButton';

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
        <GenericButton
          text={'Registration'}
          padding={5}
          hoverColor={'red'}
          margin={5}
          backgroundColor={'transparent'}
          color={'blue'}
          border={'none'}
          cursor={'pointer'}
        />
        <GenericButton
          text={'Enter the World'}
          padding={5}
          hoverColor={'red'}
          margin={5}
          backgroundColor={'transparent'}
          color={'blue'}
          border={'none'}
          cursor={'pointer'}
        />
      </ButtonContainerStyle>
    </MainStyle>
  );
};

export default Registration;
