import Phaser from 'phaser';
import Person from '../person/Person';
import PersonHealthBar from './health-bars/PersonHealthBar';

export default class PersonUI extends Phaser.Scene {
  parentScene: Phaser.Scene;

  public hp: PersonHealthBar;

  constructor(scene: Phaser.Scene, person: Person) {
    super({ key: 'person-ui' });
    this.parentScene = scene;
    this.hp = new PersonHealthBar(this.parentScene, 0, 0, person);
  }

  selfHealing(scene: Phaser.Scene) {
    this.hp.heal(scene, 5);
  }
}
