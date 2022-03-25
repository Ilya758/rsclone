import { ContainerStyle } from './game.style';
import Phaser from 'phaser';
import Dungeon from './scenes/Dungeon';
import { useEffect } from 'react';

const GameInitializer = () => {
  const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'canvasPoint',
      width: 800,
      height: 400,
      min: {
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
      },
    },
    maxLights: 100,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
      },
    },
    zoom: 2,
    scene: [Dungeon],
  };
  useEffect(() => {
    new Phaser.Game(config).scene.start('dungeon');
  }, []);

  return <ContainerStyle id={'canvasPoint'} />;
};

export default GameInitializer;
