import { ButtonStyle } from './registrationButton.style';
import { IGenericRegistrationButton } from './registrationButton.types';

const RegistrationButton = ({ text, onClick, status = true }: IGenericRegistrationButton) => {
  return <ButtonStyle status={!status} disabled={status} onClick={onClick}>{text}</ButtonStyle>;
};

export default RegistrationButton;
