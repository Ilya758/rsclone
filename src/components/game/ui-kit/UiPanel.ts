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

  create() {
    this.uiPanel = this.scene.add.image(70, 40, 'uiPanel');
    this.icon = this.scene.add.image(70, 40, 'iconMan');
    this.textZombiesCounter = this.createCounter(this.zombieCounter, 22);
    this.textAmmoQuantity = this.createCounter(this.currentAmmo, 102);

    this.icon.scale = 0.83;
    this.uiPanel.scale = 0.4;

    sceneEvents.on('killZombieEvent', () => {
      this.incrementZombieDeathCounter();
    });
  }

  incrementZombieDeathCounter() {
    this.zombieCounter += 1;
    this.textZombiesCounter?.destroy();
    this.textZombiesCounter = this.createCounter(this.zombieCounter, 22);
    sceneEvents.emit(`killZombieCounter`, this.zombieCounter);
  }

  createCounter(elem: number, x: number) {
    const content = this.scene.add.text(
      0,
      0,
      elem.toString().padStart(3, '0'),
      {
        fontFamily: 'Arial',
        fontSize: '10px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 20 },
      }
    );
    content.depth = 19;

    content.setPosition(x, 32);
    return content;
  }
}
