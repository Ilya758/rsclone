import Phaser from 'phaser';

const createZombieAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'left',
    frames: [{ key: 'zombie', frame: '.png' }], // enter the frame-info
  });
  anims.create({
    key: 'right',
    frames: [{ key: 'zombie', frame: '.png' }],
  });
  anims.create({
    key: 'up',
    frames: [{ key: 'zombie', frame: '.png' }],
  });
  anims.create({
    key: 'down',
    frames: [{ key: 'zombie', frame: '.png' }],
  });
};

export { createZombieAnims };
