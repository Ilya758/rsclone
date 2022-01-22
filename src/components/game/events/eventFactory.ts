import { QUESTLABELS } from './../../../constants/questLabels';
import Phaser from 'phaser';
import Dungeon from '../scenes/Dungeon';
import DialogBox from '../plot/DialogBox';
import { DIALOGS } from '../../../constants/dialogs';
import sceneEvents from './eventCenter';
import QuestLabel from '../ui-kit/QuestLabel';
import '../enemies/Zombie';
import plotHandle from '../plot/plotHandle';
import { IEnemySounds, IPersonSounds, ITracks } from '../scenes/dungeon.types';

export default class EventFactory {
  private roofs: Phaser.Tilemaps.TilemapLayer[];
  private scene: Dungeon;
  private person: Phaser.Physics.Arcade.Sprite;
  private personUi: Phaser.Scene;
  private questLabels: QuestLabel[];

  constructor(
    scene: Dungeon,
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
    sceneEvents.on(
      'staticMusicStart',
      (staticTrack: Phaser.Sound.BaseSound) => {
        staticTrack.play();
      }
    );

    sceneEvents.on(
      'dynamicMusicStart',
      (tracks: ITracks & IPersonSounds & IEnemySounds) => {
        this.scene.time.addEvent({
          delay: 2000,
          callback: () => {
            tracks.horde.play();
          },
        });

        this.scene.time.addEvent({
          delay: 5000,
          callback: () => {
            sceneEvents.emit(`dialog`, 8);
            tracks.phrases['first-phrase'].play();
          },
        });

        this.scene.time.addEvent({
          delay: 8000,
          callback: () => {
            tracks.static.stop();
            tracks.dynamic.play();
          },
        });
      }
    );

    sceneEvents.on('killZombieCounter', (counter: number) => {
      if (counter === 1) {
        plotHandle('killFirstZombie');
      }
      if (counter === 6) {
        plotHandle('killSecondZombies');
      }
      if (counter === 16) {
        plotHandle('killLastZombies');
      }
    });

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
        new QuestLabel(
          this.personUi,
          QUESTLABELS[number],
          number,
          10,
          this.questLabels.length * 15 + 80
        )
      );
    });

    sceneEvents.on('questLabelDestroy', (number: number) => {
      this.questLabels = this.questLabels.filter((quest: QuestLabel) => {
        if (quest.number === number) {
          quest.crossLine();
          return false;
        }
        return true;
      });
    });

    sceneEvents.on('roof', (number: number) => {
      this.scene.tweens.add({
        targets: this.roofs[number],
        alpha: 0,
        duration: 800,
      });
    });

    sceneEvents.on('zombie', (number: number) => {
      this.scene.createGroupOfZombies(number);
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
