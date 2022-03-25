import Zombie from '../enemies/Zombie';
import Person from '../person/Person';
import HandBoss from '../enemies/HandBoss';
import ClawBoss from '../enemies/ClawBoss';
import MegaBoss from '../enemies/MegaBoss';

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

      handBoss(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): HandBoss;

      clawBoss(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): ClawBoss;

      megaBoss(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): MegaBoss;
    }
  }
}
