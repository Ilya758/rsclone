import { ButtonStyle } from './registrationButton.style';
import { IGenericRegistrationButton } from './registrationButton.types';

const RegistrationButton = ({ text, onClick }: IGenericRegistrationButton) => {
  return <ButtonStyle onClick={onClick}>{text}</ButtonStyle>;
};

export default RegistrationButton;
