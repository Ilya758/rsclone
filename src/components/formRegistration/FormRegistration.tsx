import {
  FormRegistrationWrapper,
  RegistrationHeader,
} from './formRegistration.style';
import Input from '../inputs/Input';

function FormRegistration() {
  return (
    <FormRegistrationWrapper>
      <RegistrationHeader>Enter the Zero World!</RegistrationHeader>
      <Input type="text" text="Login" placeholder="Enter login" id="login" />
      <Input
        type="password"
        text="Password"
        placeholder="Enter password"
        id="password"
      />
    </FormRegistrationWrapper>
  );
}

export default FormRegistration;
