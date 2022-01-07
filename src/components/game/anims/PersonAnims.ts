import Phaser from 'phaser';

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'left',
    frames: [{ key: 'person', frame: '.png' }], // enter the frame-info
  });
  anims.create({
    key: 'right',
    frames: [{ key: 'person', frame: '.png' }],
  });
  anims.create({
    key: 'up',
    frames: [{ key: 'person', frame: '.png' }],
  });
  anims.create({
    key: 'down',
    frames: [{ key: 'person', frame: '.png' }],
  });
  anims.create({
    key: 'Walk_riffle',
    frames: anims.generateFrameNames('person', {
      start: 0,
      end: 5,
      prefix: 'Walk_riffle_00',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 8,
  });
};

export { createCharacterAnims };
