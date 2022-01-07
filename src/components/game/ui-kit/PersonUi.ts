import Phaser from 'phaser';
import Person from '../person/Person';
import PersonHealthBar from './health-bars/PersonHealthBar';

export default class PersonUI extends Phaser.Scene {
  parentScene: Phaser.Scene;

  public hpBar: PersonHealthBar;

  constructor(scene: Phaser.Scene, person: Person) {
    super({ key: 'person-ui' });
    this.parentScene = scene;
    this.hpBar = person.hpBar;
  }
}
