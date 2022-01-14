import { IGenericButton } from '../genericButton/genericButton.types';

export interface IGenericRegistrationButton extends IGenericButton {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  address: string;
}
