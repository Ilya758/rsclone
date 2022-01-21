import Phaser from 'phaser';

export default (settingsMenu: Phaser.GameObjects.Image) => {
  return {
    0: {
      y: settingsMenu.y - 70,
      name: 'Sounds',
    },
    1: {
      y: settingsMenu.y,
      name: 'Music',
    },
    2: {
      y: settingsMenu.y + 70,
      name: 'Back to menu',
    },
  };
};
