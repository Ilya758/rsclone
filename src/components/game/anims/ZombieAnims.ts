import Phaser from 'phaser';

const createZombieAnims = (
  anims: Phaser.Animations.AnimationManager,
  zombieType: string
) => {
  anims.create({
    key: 'stay',
    frames: anims.generateFrameNames(zombieType, {
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
    frames: anims.generateFrameNames(zombieType, {
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
    frames: anims.generateFrameNames(zombieType, {
      start: 0,
      end: 8,
      prefix: 'walk_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 9,
  });
  anims.create({
    key: 'zombie-death',
    frames: anims.generateFrameNames(zombieType, {
      start: 0,
      end: 5,
      prefix: 'Death_00',
      suffix: '.png',
    }),
    frameRate: 5,
  });
};

export { createZombieAnims };
