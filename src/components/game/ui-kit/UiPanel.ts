import Phaser from 'phaser';
import sceneEvents from '../events/eventCenter';

export default class UIPanel {
  protected scene: Phaser.Scene;
  public totalZombies: Phaser.GameObjects.Text;
  public totalDeaths: Phaser.GameObjects.Text;
  public zombieCounter: number;
  public deathCounter: number;
  public icon: Phaser.GameObjects.Image;
  public iconWrapper: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    this.zombieCounter = 0;
    this.deathCounter = 0;
    this.scene = scene;
    this.iconWrapper = this.scene.add.image(70, 40, 'secondIcon');
    this.icon = this.scene.add.image(70, 40, 'iconMan');
    this.totalZombies = this.createTotalZombies();
    this.totalDeaths = this.createTotalDeaths();
    this.start();
    this.appendToScene();
  }

  start() {
    this.icon.setScale(0.83, 0.83);
    this.iconWrapper.setScale(0.4, 0.4);
    sceneEvents.on('killZombieEvent', () => {
      this.zombieCounter += 1;
      this.totalZombies.destroy();
      this.totalZombies = this.createTotalZombies();
      sceneEvents.emit(`killZombieCounter`, this.zombieCounter);
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

    content.setPosition(22, 32);
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

    content.setPosition(105, 32);
    return content;
  }

  appendToScene() {
    this.scene.add.existing(this.totalZombies);
  }
}
