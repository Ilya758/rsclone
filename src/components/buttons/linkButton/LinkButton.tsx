import { ButtonStyle } from './linkButton.style';
import { IGenericRegistrationButton } from './linkButton.types';
import { Link } from 'react-router-dom';

const LinkButton = ({ text, onClick, address }: IGenericRegistrationButton) => {
  return (
    <ButtonStyle onClick={onClick}>
      <Link
        onClick={() => {
          onClick;
        }}
        to={address}
      >
        {text}
      </Link>
    </ButtonStyle>
  );
};

export default LinkButton;
