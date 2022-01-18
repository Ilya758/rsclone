import { COORDINATES } from './../../../constants/coordinates';
import { QUESTLABELS } from './../../../constants/questLabels';
import Phaser from 'phaser';
import DialogBox from '../plot/DialogBox';
import { DIALOGS } from '../../../constants/dialogs';
import sceneEvents from './eventCenter';
import QuestLabel from '../ui-kit/QuestLabel';
import '../enemies/Zombie';
export default class EventFactory {
  private roofs: Phaser.Tilemaps.TilemapLayer[];
  private scene: Phaser.Scene;
  private person: Phaser.Physics.Arcade.Sprite;
  private personUi: Phaser.Scene;
  private questLabels: QuestLabel[];

  constructor(
    scene: Phaser.Scene,
    person: Phaser.Physics.Arcade.Sprite,
    roofs: Phaser.Tilemaps.TilemapLayer[],
    personUi: Phaser.Scene
  ) {
    this.scene = scene;
    this.person = person;
    this.roofs = roofs;
    this.personUi = personUi;
    this.run();
    this.questLabels = [];
  }

  run() {
    // sceneEvents.on('killZombieEvent', () => {})

    sceneEvents.on('hide', () => {
      this.scene.cameras.main.fadeOut(2000);
      //TODO
      setTimeout(() => {
        this.person.setX(400);
        this.person.setY(400);
      }, 3000);
      setTimeout(() => {
        this.scene.cameras.main.fadeIn(1000);
      }, 3000);
    });

    sceneEvents.on('questLabel', (number: number) => {
      this.questLabels.push(
        new QuestLabel(this.personUi, QUESTLABELS[number], number, 10, 150)
      );
    });

    sceneEvents.on('questLabelDestroy', (number: number) => {
      this.questLabels[number].crossLine();
    });

    sceneEvents.on('roof', (number: number) => {
      this.scene.tweens.add({
        targets: this.roofs[number],
        alpha: 0,
        duration: 800,
      });
    });
    sceneEvents.on('zombie', (number: number) => {
      this.scene.add.zombie(
        COORDINATES.zombie[number][0],
        COORDINATES.zombie[number][1],
        'zombie'
      );
    });
    sceneEvents.on('zombies', (number: number) => {
      this.scene.add.zombie(
        COORDINATES.zombies[number][0],
        COORDINATES.zombies[number][1],
        'zombie'
      );
      this.scene.add.zombie(
        COORDINATES.zombies[number][0],
        COORDINATES.zombies[number][1],
        'zombie'
      );
      this.scene.add.zombie(
        COORDINATES.zombies[number][0],
        COORDINATES.zombies[number][1],
        'zombie'
      );
      //TODO зареспать много мобов
    });

    sceneEvents.on(
      'dialog',
      (number: number) => {
        if (!this.person) throw new Error('error');
        const coords = (
          DIALOGS[number].coordinates
            ? DIALOGS[number].coordinates
            : [this.person.x, this.person.y]
        ) as number[];
        new DialogBox(
          coords[0] - DIALOGS[number].width / 7,
          coords[1] -
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
