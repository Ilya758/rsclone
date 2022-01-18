import Phaser from 'phaser';
import sceneEvents from '../events/eventCenter';

export default class IconUi {
  protected scene: Phaser.Scene;
  public totalZombies: Phaser.GameObjects.Text;
  public totalDeaths: Phaser.GameObjects.Text;
  public zombieCounter: number;
  public deathCounter: number;
  public icon: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    this.zombieCounter = 0;
    this.deathCounter = 0;
    this.scene = scene;
    this.icon = this.scene.add.image(80, 120, 'secondIcon');
    this.totalZombies = this.createTotalZombies();
    this.totalDeaths = this.createTotalDeaths();
    this.start();
    this.appendToScene();
  }

  start() {
    this.icon.setScale(0.3, 0.3);
    sceneEvents.on('killZombieEvent', () => {
      console.log('kill');
      this.zombieCounter += 1;
      this.totalZombies.destroy();
      this.totalZombies = this.createTotalZombies();
    });
    sceneEvents.on('deathEvent', () => {
      this.deathCounter += 1;
      this.totalDeaths.destroy();
      this.totalDeaths = this.createTotalDeaths();
    });
  }

  createTotalZombies() {
    const content = this.scene.add.text(
      0,
      0,
      this.zombieCounter.toString().padStart(3, '0'),
      {
        fontFamily: 'Arial',
        fontSize: '10px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 20 },
      }
    );
    content.depth = 19;

    content.setPosition(42, 112);
    return content;
  }

  createTotalDeaths() {
    const content = this.scene.add.text(
      0,
      0,
      this.deathCounter.toString().padStart(2, '0'),
      {
        fontFamily: 'Arial',
        fontSize: '10px',
        color: '#ffffff',
        align: 'justify',
        wordWrap: { width: 30 },
      }
    );
    content.depth = 19;

    content.setPosition(104, 112);
    return content;
  }

  appendToScene() {
    this.scene.add.existing(this.totalZombies);
  }
}
