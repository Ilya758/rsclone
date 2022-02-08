import Phaser from 'phaser';

const createMegaBossAnims = (
  anims: Phaser.Animations.AnimationManager | Phaser.Animations.AnimationState
) => {
  anims.create({
    key: 'stay',
    frames: anims.generateFrameNames('megaBoss', {
      start: 0,
      end: 8,
      prefix: 'Attack_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'kick1',
    frames: anims.generateFrameNames('megaBoss', {
      start: 0,
      end: 9,
      prefix: 'Attack_1_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'kick2',
    frames: anims.generateFrameNames('megaBoss', {
      start: 0,
      end: 6,
      prefix: 'Attack_2_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'kick3',
    frames: anims.generateFrameNames('megaBoss', {
      start: 0,
      end: 8,
      prefix: 'Attack_3_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'kick4',
    frames: anims.generateFrameNames('megaBoss', {
      start: 0,
      end: 8,
      prefix: 'Attack_4_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'walk',
    frames: anims.generateFrameNames('megaBoss', {
      start: 0,
      end: 7,
      prefix: 'walk_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'zombie-death',
    frames: anims.generateFrameNames('megaBoss', {
      start: 0,
      end: 13,
      prefix: 'Death_00',
      suffix: '.png',
    }),
    frameRate: 9,
  });
};

export { createMegaBossAnims };
