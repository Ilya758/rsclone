import Arena from './scenes/Arena';
import { useEffect } from 'react';

const Multiplayer = () => {
  const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'canvasPoint',
      width: 800,
      height: 400,
      min: {
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
      },
    },
    maxLights: 100,
    backgroundColor: '#000000',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
      },
    },
    zoom: 2,
    scene: [Arena],
  };
  useEffect(() => {
    new Phaser.Game(config).scene.start('dungeon');
  }, []);

  return <div id={'canvasPoint'} />;
};

export default Multiplayer;
