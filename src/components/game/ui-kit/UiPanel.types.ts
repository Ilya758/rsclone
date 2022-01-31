export type TWeapon = 'knife' | 'bat' | 'pistol' | 'rifle' | 'flamethrower';

export type TWeapons = {
  [weapon in TWeapon]: Phaser.GameObjects.Image | null;
};

export type TWeaponGraphicChar = 'rotation' | 'scale';

export type TWeaponsGraphicChars = {
  [char in TWeaponGraphicChar]: number;
};
