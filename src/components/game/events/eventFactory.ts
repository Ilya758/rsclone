import Phaser from 'phaser';
import DialogBox from '../plot/DialogBox';
import { DIALOGS } from '../../../constants/dialogs';
import sceneEvents from './eventCenter';

export default class EventFactory {
  private roofs: Phaser.Tilemaps.TilemapLayer[];
  private scene: Phaser.Scene;
  private person: Phaser.Physics.Arcade.Sprite;

  constructor(
    scene: Phaser.Scene,
    person: Phaser.Physics.Arcade.Sprite,
    roofs: Phaser.Tilemaps.TilemapLayer[]
  ) {
    this.scene = scene;
    this.person = person;
    this.roofs = roofs;
    this.run();
  }

  run() {
    sceneEvents.on('roof', (number: number) => {
      this.scene.tweens.add({
        targets: this.roofs[number],
        alpha: 0,
        duration: 800,
      });
    });
    sceneEvents.on(
      'dialog',
      (number: number) => {
        if (!this.person) throw new Error('error');
        const coords = DIALOGS[number].coordinates
          ? DIALOGS[number].coordinates
          : [this.person.x, this.person.y];
        new DialogBox(
          coords![0] - DIALOGS[number].width / 7,
          coords![1] -
            (DIALOGS[number].height + DIALOGS[number].height / 4 + 10),
          DIALOGS[number].width,
          DIALOGS[number].height,
          DIALOGS[number].text,
          DIALOGS[number].delay,
          this.scene
        );
      },
      this
    );
  }
}
