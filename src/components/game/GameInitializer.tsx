import { ContainerStyle } from './game.style';
import Phaser from 'phaser';
import Game from './scenes/game';
import Preloader from './scenes/preloader';
import { useEffect } from "react";

const GameInitializer = () => {
  
  const config = {
    type: Phaser.AUTO,
    parent: 'canvasPoint',
    width: 480,
    height: 480,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true,
      },
    },
    scene: [Preloader, Game],
  };
  useEffect(() => {
    new Phaser.Game(config);
  }, [])



  console.log('Game Entry Point. Warning!!!');
  return <ContainerStyle id={'canvasPoint'} />;
};

export default GameInitializer;
