import { ButtonStyle } from './registrationButton.style';
import { IGenericRegistrationButton } from './registrationButton.types';

const RegistrationButton = ({ text }: IGenericRegistrationButton) => {
  return <ButtonStyle>{text}</ButtonStyle>;
};

export default RegistrationButton;
