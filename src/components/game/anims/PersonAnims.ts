import Phaser from 'phaser';
import { WEAPONS } from '../../../constants/weapons';
import { WEAPON_ANIMATION_CHARS } from '../../../constants/weaponsAnimationChars';
import { TWeaponSounds } from '../scenes/dungeon.types';

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
  WEAPONS.forEach(weapon => {
    let currentAnim = weapon;

    const currentWeaponChars =
      WEAPON_ANIMATION_CHARS[weapon as keyof TWeaponSounds];

    if (weapon === 'shotgun' || weapon === 'sniper') {
      currentAnim = 'rifle';
    }

    anims.create({
      key: `idle_${weapon}`,
      frames: anims.generateFrameNames('person', {
        start: 0,
        end: 7,
        prefix: `Idle_${currentAnim}_00`,
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 4,
    });
    anims.create({
      key: `walk_${weapon}`,
      frames: anims.generateFrameNames('person', {
        start: 0,
        end: 5,
        prefix: `Walk_${currentAnim}_00`,
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 8,
    });
    anims.create({
      key: weapon,
      frames: anims.generateFrameNames('person', {
        start: currentWeaponChars.start,
        end: currentWeaponChars.end,
        prefix: `${currentAnim}_00`,
        suffix: '.png',
      }),
      repeat: -1,
      duration: currentWeaponChars.duration,
      repeatDelay: currentWeaponChars.delay,
    });
  });

  anims.create({
    key: 'death',
    frames: anims.generateFrameNames('person', {
      start: 0,
      end: 5,
      prefix: 'death_00',
      suffix: '.png',
    }),
    frameRate: 6,
  });
};

export { createCharacterAnims };
