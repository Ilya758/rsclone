import { Meta } from '@storybook/react';
import React from 'react';
import GenericButton from './GenericButton';

export default {
  title: 'Components/Buttons',
  component: GenericButton,
} as Meta;

export const Button1: React.VFC<{}> = () => <GenericButton padding={'10px'}
                                                           hoverColor={'red'}
                                                           margin={'10px'}
                                                           backgroundColor={'green'}
                                                           border={'1px solid black'}
                                                           color={'blue'}
                                                           cursor={'pointer'}
                                                           letterSpacing={2}
                                                           text={'BUTTON'}
/>