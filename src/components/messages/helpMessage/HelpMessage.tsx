import { IHelpMessage } from './helpMessage.types';
import { HelpMessageStyle } from './helpMessage.style';

const HelpMessage = ({ display }: IHelpMessage) => {
  return (
    <HelpMessageStyle display={display}>
      <img
        src="./assets/images/tooltip-image.png"
        alt="help tooltip"
        width="618px"
        height="463px"
      />
    </HelpMessageStyle>
  );
};

export default HelpMessage;
