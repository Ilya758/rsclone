import Phaser from 'phaser';

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'idle_riffle',
    frames: anims.generateFrameNames('person', {
      start: 0,
      end: 7,
      prefix: 'Idle_riffle_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 4,
  });
  anims.create({
    key: 'walk_riffle',
    frames: anims.generateFrameNames('person', {
      start: 0,
      end: 5,
      prefix: 'Walk_riffle_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 8,
  });
  anims.create({
    key: 'riffle',
    frames: anims.generateFrameNames('person', {
      start: 2,
      end: 7,
      prefix: 'Riffle_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 16,
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
