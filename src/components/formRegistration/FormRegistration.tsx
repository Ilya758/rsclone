import { WrapperStyle, HeaderStyle } from './formRegistration.style';
import Input from '../inputs/Input';

function FormRegistration() {
  return (
    <WrapperStyle>
      <HeaderStyle>Enter the Zero World!</HeaderStyle>
      <Input type="text" text="Login" placeholder="Enter login" id="login" />
      <Input
        type="password"
        text="Password"
        placeholder="Enter password"
        id="password"
      />
    </WrapperStyle>
  );
}

export default FormRegistration;
