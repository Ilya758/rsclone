import { Meta } from '@storybook/react';
import React from 'react';
import RegistrationButton from './RegistrationButton';

export default {
  title: 'Components/Buttons',
  component: RegistrationButton,
} as Meta;

export const RegistrationButton1: React.VFC<unknown> = () => (
  <RegistrationButton
    text={'Registration button'}
    onClick={() => console.log('login')}
  />
);
