import { ContainerStyle } from './game.style';
import Phaser from 'phaser';
import Game from './scenes/game';
import Preloader from './scenes/preloader';

const GameInitializer = () => {
  const config = {
    type: Phaser.AUTO,
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
    // zoom: 2,
  };

  new Phaser.Game(config);

  console.log('Game Entry Point. Warning!!!');
  return <ContainerStyle className="game-initializer" />;
};

export default GameInitializer;
