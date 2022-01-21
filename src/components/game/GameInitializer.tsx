import { ContainerStyle } from './game.style';
import Phaser from 'phaser';
import Dungeon from './scenes/Dungeon';
import { useEffect } from 'react';

const GameInitializer = () => {
  const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: 'canvasPoint',
      width: 800,
      height: 400,
      min: {
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
      },
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        // debug: true,
      },
    },
    zoom: 2,
    scene: [Dungeon],
  };
  useEffect(() => {
    new Phaser.Game(config).scene.start('dungeon');
  }, []);

  console.log('Game Entry Point. Warning!!!');
  return <ContainerStyle id={'canvasPoint'} />;
};

export default GameInitializer;
