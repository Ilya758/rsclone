import Phaser from 'phaser';

const createZombieAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'stay',
    frames: anims.generateFrameNames('zombie', {
      start: 152,
      end: 167,
      prefix: '',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 8,
  });
  anims.create({
    key: 'kick',
    frames: anims.generateFrameNames('zombie', {
      start: 30,
      end: 69,
      prefix: '',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 20,
  });
  anims.create({
    key: 'walk',
    frames: anims.generateFrameNames('zombie', {
      start: 0,
      end: 29,
      prefix: '',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 20,
  });
};

export { createZombieAnims };
