import Phaser from 'phaser';

const createZombieBossAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'stay',
    frames: anims.generateFrameNames('zombie', {
      start: 6,
      end: 8,
      prefix: 'Attack_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 4,
  });
  anims.create({
    key: 'kick1',
    frames: anims.generateFrameNames('zombie', {
      start: 0,
      end: 13,
      prefix: 'Attack_1_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'kick2',
    frames: anims.generateFrameNames('zombie', {
      start: 0,
      end: 9,
      prefix: 'Attack_2_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'walk',
    frames: anims.generateFrameNames('zombie', {
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
    frames: anims.generateFrameNames('zombie', {
      start: 0,
      end: 9,
      prefix: 'Death_00',
      suffix: '.png',
    }),
    frameRate: 5,
  });
};

export { createZombieBossAnims };
