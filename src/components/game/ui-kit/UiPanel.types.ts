import { TWeapon } from '../../../types/globals';

export type TWeaponsIcons = {
  [weapon in TWeapon]: Phaser.GameObjects.Image | null;
};

export type TWeaponGraphicChar = 'rotation' | 'scale';

export type TWeaponsGraphicChars = {
  [char in TWeaponGraphicChar]: number;
};
