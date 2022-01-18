import Phaser from 'phaser';
import Person from '../person/Person';
import PersonHealthBar from './health-bars/PersonHealthBar';

export default class PersonUI extends Phaser.Scene {
  parentScene: Phaser.Scene;

  public hpBar: PersonHealthBar;
  public items: number;
  public knife: Phaser.GameObjects.Image | null;
  public bat: Phaser.GameObjects.Image | null;
  public gun: Phaser.GameObjects.Image | null;
  public fire: Phaser.GameObjects.Image | null;
  public rifle: Phaser.GameObjects.Image | null;
  public active: Phaser.GameObjects.Image | null;
  public itemKeys: {
    [key: string]: number;
  };

  constructor(scene: Phaser.Scene, person: Person) {
    super({ key: 'person-ui' });
    this.parentScene = scene;
    this.hpBar = new PersonHealthBar(scene, 0, 0, person);
    person.hpBar = this.hpBar;
    this.items = 0;
    this.knife = null;
    this.rifle = null;
    this.bat = null;
    this.fire = null;
    this.gun = null;
    this.active = null;
    this.itemKeys = {
      rifle: 482,
      knife: 302,
      bat: 362,
      gun: 422,
      fire: 542,
    };
  }

  create() {
    const emptyItems = this.add.group({
      classType: Phaser.GameObjects.Image,
    });
    emptyItems.createMultiple({
      setScale: { x: 0.25, y: 0.25 },
      key: 'empty-item',
      setXY: {
        x: 300,
        y: 370,
        stepX: 60,
      },
      quantity: 5,
    });
    this.knife = this.add.image(300, 365, 'knife');
    this.knife.setScale(0.3, 0.3);
    this.bat = this.add.image(360, 365, 'bat');
    this.bat.setRotation(0.55);
    this.bat.setScale(0.15, 0.15);
    this.gun = this.add.image(420, 365, 'gun');
    this.gun.setRotation(0.45);
    this.gun.setScale(0.3, 0.3);
    this.rifle = this.add.image(480, 365, 'rifle');
    this.rifle.setRotation(0.45);
    this.rifle.setScale(0.15, 0.15);
    this.fire = this.add.image(540, 365, 'firethrower');
    this.fire.setRotation(0.45);
    this.fire.setScale(0.15, 0.15);
    this.changeWeapon('knife');
  }

  changeWeapon(type: string) {
    if (this.active) this.active.destroy();

    this.active = this.add.image(this.itemKeys[type], 365, 'active-item');
    this.active.setScale(0.13, 0.13);
  }
}
