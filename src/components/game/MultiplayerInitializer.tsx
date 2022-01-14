import Phaser from 'phaser';
import { useEffect } from 'react';
import { ContainerStyle } from './game.style';
import Dungeon from "./scenes/Arena";

const MultiplayerInitializer = () => {
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
        height: 400,
      },
      max: {
        width: 1600,
        height: 1200,
      },
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true,
      },
    },
    zoom: 2,
    scene: [Dungeon],
  };
  useEffect(() => {
    new Phaser.Game(config).scene.start('dungeon');
  }, []);
  
  console.log('MultiPlayer Entry Point. Warning!!!');
  return <ContainerStyle id={'canvasPoint'} />;
};

export default MultiplayerInitializer;
