import Phaser from 'phaser';

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
  const weapons = ['rifle', 'gun', 'bat', 'knife', 'firethrower'];
  weapons.forEach(weapon => {
    anims.create({
      key: `idle_${weapon}`,
      frames: anims.generateFrameNames('person', {
        start: 0,
        end: 7,
        prefix: `Idle_${weapon}_00`,
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
        prefix: `Walk_${weapon}_00`,
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 8,
    });
    anims.create({
      key: weapon,
      frames: anims.generateFrameNames('person', {
        start: 2,
        end: 7,
        prefix: `${weapon}_00`,
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
