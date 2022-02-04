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
    maxLights: 50,
    backgroundColor: '#000000',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        // debug: true,
      },
    },
    zoom: 2,
    scene: [Arena],
  };
  useEffect(() => {
    new Phaser.Game(config).scene.start('dungeon');
  }, []);

  console.log('MultiPlayer Entry Point. Warning!!!');
  return <div id={'canvasPoint'} />;
};

export default Multiplayer;
