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
};

export { createCharacterAnims };
