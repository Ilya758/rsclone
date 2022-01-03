import { ContainerStyle } from './game.style';
import Phaser from 'phaser';
import Game from './scenes/game';
import Preloader from './scenes/preloader';
import { useEffect } from 'react';

const GameInitializer = () => {
  const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'canvasPoint',
      width: 800,
      height: 400,
      min: {
        width: 800,
        height: 400
      },
      max: {
        width: 1600,
        height: 1200
      }
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true,
      },
    },
    zoom: 2,
    scene: [Preloader, Game],
  };
  useEffect(() => {
    new Phaser.Game(config);
  }, []);

  console.log('Game Entry Point. Warning!!!');
  return <ContainerStyle id={'canvasPoint'} />;
};

export default GameInitializer;
