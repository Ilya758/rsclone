import Dungeon from "./scenes/Arena";
import { useEffect } from "react";


const Multiplayer = () => {
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
  return <div id={'canvasPoint'} />;
};

export default Multiplayer;
