import Phaser from 'phaser';
import { WEAPONS } from '../../../constants/weapons';

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
  WEAPONS.forEach(weapon => {
    let curWeapon = weapon;

    if (weapon === 'shotgun' || weapon === 'sniper') {
      curWeapon = 'rifle';
    }

    anims.create({
      key: `idle_${curWeapon}`,
      frames: anims.generateFrameNames('person', {
        start: 0,
        end: 7,
        prefix: `Idle_${curWeapon}_00`,
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 4,
    });
    anims.create({
      key: `walk_${curWeapon}`,
      frames: anims.generateFrameNames('person', {
        start: 0,
        end: 5,
        prefix: `Walk_${curWeapon}_00`,
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 8,
    });
    anims.create({
      key: curWeapon,
      frames: anims.generateFrameNames('person', {
        start: 2,
        end: 7,
        prefix: `${curWeapon}_00`,
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 16,
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
