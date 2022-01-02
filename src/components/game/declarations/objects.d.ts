import Zombie from '../enemies/Zombie';
import Person from '../person/Person';

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      person(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Person;

      zombie(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Zombie;
    }
  }
}
