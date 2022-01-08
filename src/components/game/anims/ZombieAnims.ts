import Phaser from 'phaser';

const createZombieAnims = (anims: Phaser.Animations.AnimationManager) => {
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
    key: 'kick',
    frames: anims.generateFrameNames('zombie', {
      start: 0,
      end: 8,
      prefix: 'Attack_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'walk',
    frames: anims.generateFrameNames('zombie', {
      start: 0,
      end: 8,
      prefix: 'walk_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'death',
    frames: anims.generateFrameNames('zombie', {
      start: 0,
      end: 5,
      prefix: 'Death_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
};

export { createZombieAnims };
