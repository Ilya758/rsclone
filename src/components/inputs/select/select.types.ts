import { ChangeEvent } from 'react';

export interface ISelect {
  options: string[];
  id: string;
  name: string;
  changeHandle: (e: ChangeEvent<HTMLSelectElement>) => void;
}
