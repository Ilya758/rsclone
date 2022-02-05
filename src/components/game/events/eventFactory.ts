import { ITEMS } from './../../../constants/items';
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
import { ISounds } from '../ui-kit/settings-menu.types';
import Person from '../person/Person';

export default class EventFactory {
  private roofs: Phaser.Tilemaps.TilemapLayer[];
  private scene: Dungeon;
  private person: Person;
  private personUi: Phaser.Scene;
  private questLabels: QuestLabel[];
  private dialogQueue: number[];
  private counter: number;
  private speedUp: QuestLabel | null;

  constructor(
    scene: Dungeon,
    person: Person,
    roofs: Phaser.Tilemaps.TilemapLayer[],
    personUi: Phaser.Scene
  ) {
    this.scene = scene;
    this.speedUp = null;
    this.person = person;
    this.roofs = roofs;
    this.personUi = personUi;
    this.run();
    this.questLabels = [];
    this.dialogQueue = [];
    this.counter = 0;
  }

  handleGetItem(item: Phaser.Physics.Arcade.Image, itemRandom: number) {
    sceneEvents.emit('dialog', 9 + itemRandom);
    sceneEvents.emit('getItem', itemRandom);
    item.destroy();
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
    this.checkQueueLength();
    sceneEvents.on('dropItem', (coords: number[]) => {
      const random = Phaser.Math.Between(0, 99);
      const itemRandom = Phaser.Math.Between(0, 3);
      if (random <= 20) {
        const item = this.scene.physics.add.image(
          coords[0],
          coords[1],
          ITEMS[itemRandom]
        );
        item.depth = 1;
        item.setScale(0.4, 0.4);
        this.scene.physics.add.overlap(item, this.person, () =>
          this.handleGetItem(item, itemRandom)
        );
      }
    });

    sceneEvents.on('killZombieCounter', (counter: number) => {
      this.counter = counter;
      if (this.counter === 1) {
        plotHandle('killFirstZombie');
      }
      if (this.counter === 6) {
        plotHandle('killSecondZombies');
      }
      if (this.counter === 16) {
        plotHandle('killLastZombies');
      }
      if (this.counter === 21) {
        plotHandle('killZombie21');
      }
      if (this.counter === 100 || this.counter === 50) {
        plotHandle('killZombie100');
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
        this.dialogQueue.push(number);
      },
      this
    );

    sceneEvents.on(
      'getItem',
      (number: number) => {
        switch (number) {
          case 0:
            this.person.speed = 150;
            this.speedUp = new QuestLabel(
              this.personUi,
              '-speed up: ',
              20,
              10,
              150
            );
            setTimeout(() => {
              if (!this.speedUp) throw new Error('error');
              this.speedUp.crossLine();
              this.speedUp = null;
              this.person.speed = 100;
            }, 10000);
            break;
          case 1:
            this.person.hp = Math.min(this.person.hp + 25, 100);
            break;
          case 2:
            console.log('slow');
            break;
          case 3:
            console.log('rage');
            break;
        }
      },
      this
    );

    sceneEvents.on('person-death', () => {
      this.scene.scene.run('game-over');
      this.scene.scene.stop();
      this.personUi.scene.stop();
      (this.scene.sound as ISounds).sounds.forEach(sound => sound.stop());
    });
  }

  checkQueueLength() {
    if (this.dialogQueue && this.dialogQueue.length >= 1) {
      this.dialogHandle();
    } else {
      setTimeout(() => {
        this.checkQueueLength();
      }, 500);
    }
  }
  dialogHandle() {
    if (!this.person) throw new Error('error');
    const coords = (
      DIALOGS[this.dialogQueue[0]].coordinates
        ? DIALOGS[this.dialogQueue[0]].coordinates
        : [this.person.x, this.person.y]
    ) as number[];
    new DialogBox(
      coords[0] - DIALOGS[this.dialogQueue[0]].width / 7,
      coords[1] -
        (DIALOGS[this.dialogQueue[0]].height +
          DIALOGS[this.dialogQueue[0]].height / 4 +
          10),
      DIALOGS[this.dialogQueue[0]].width,
      DIALOGS[this.dialogQueue[0]].height,
      DIALOGS[this.dialogQueue[0]].text,
      DIALOGS[this.dialogQueue[0]].delay,
      this.scene
    );
    {
      setTimeout(() => {
        this.dialogQueue.shift();
        this.checkQueueLength();
      }, DIALOGS[this.dialogQueue[0]].delay);
    }
  }
}
