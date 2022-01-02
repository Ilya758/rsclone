import Phaser from 'phaser';

const createZombieAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'left',
    frames: [{ key: 'zombie', frame: '1.png' }], // enter the frame-info
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
