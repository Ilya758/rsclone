import Phaser from 'phaser';
import sceneEvents from '../events/eventCenter';

export default class UIPanel {
  private scene: Phaser.Scene;

  private textZombiesCounter: Phaser.GameObjects.Text | null;

  private textAmmoQuantity: Phaser.GameObjects.Text | null;

  private zombieCounter: number;

  private currentAmmo: number;

  private icon: Phaser.GameObjects.Image | null;

  private uiPanel: Phaser.GameObjects.Image | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.zombieCounter = this.currentAmmo = 0;
    this.textZombiesCounter =
      this.textAmmoQuantity =
      this.icon =
      this.uiPanel =
        null;
    this.create();
  }
    this.uiPanel = this.scene.add.image(70, 40, 'uiPanel');
    this.icon = this.scene.add.image(70, 40, 'iconMan');
    this.totalZombies = this.createTotalZombies();
    this.totalDeaths = this.createTotalDeaths();
    this.start();
  }

  start() {
    this.icon.setScale(0.83, 0.83);
    this.uiPanel.setScale(0.4, 0.4);

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
}
