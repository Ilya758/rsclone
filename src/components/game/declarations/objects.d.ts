import Zombie from '../enemies/Zombie';
import ArmyZombie from '../enemies/ArmyZombie';
import PoliceZombie from '../enemies/PoliceZombie';
import FemaleZombie from '../enemies/FemaleZombie';
import Person from '../person/Person';
import femaleZombieBrunet from '../enemies/FemaleZombieBrunet';
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

      armyZombie(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): ArmyZombie;

      policeZombie(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): PoliceZombie;

      femaleZombie(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): FemaleZombie;

      femaleZombieBrunet(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): femaleZombieBrunet;

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
