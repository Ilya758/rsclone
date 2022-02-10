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
import PersonUI from '../ui-kit/PersonUi';
import { ZOMBIE_COORDINATES } from '../../../constants/coordinates';

export default class EventFactory {
  private roofs: Phaser.Tilemaps.TilemapLayer[];
  private scene: Dungeon;
  private person: Person;
  private personUi: PersonUI;
  private questLabels: QuestLabel[];
  private dialogQueue: number[];
  private counter: number;
  private speedUp: QuestLabel | null;
  private surviveLabel: QuestLabel | null;
  private zombieQuestCounter: number;

  constructor(
    scene: Dungeon,
    person: Person,
    roofs: Phaser.Tilemaps.TilemapLayer[],
    personUi: PersonUI
  ) {
    this.surviveLabel = null;
    this.scene = scene;
    this.speedUp = null;
    this.person = person;
    this.roofs = roofs;
    this.personUi = personUi;
    this.run();
    this.zombieQuestCounter = 0;
    this.questLabels = [];
    this.dialogQueue = [];
    this.counter = 0;
  }

  handleGetItem(item: Phaser.Physics.Arcade.Image, itemRandom: number) {
    Person.sayPhrase(this.scene);
    sceneEvents.emit('getItem', itemRandom);
    item.destroy();
  }

  timer = () => {
    this.personUi.timer -= 1;
    if (!this.surviveLabel) throw new Error('error');
    this.surviveLabel.destroyText();
    if (this.personUi.timer <= 0) {
      sceneEvents.emit(`survived`);
    } else {
      this.surviveLabel = new QuestLabel(
        this.personUi,
        `Survive: 0:${
          this.personUi.timer < 10
            ? `0${this.personUi.timer}`
            : this.personUi.timer
        }`,
        20,
        10,
        110
      );
    }
  };

  run() {
    sceneEvents.on('survived', () => {
      //TODO вызвать музыку, вызвать конец игры
      this.scene.scene.run('game-over');
      this.scene.scene.stop();
      this.personUi.scene.stop();
    });

    sceneEvents.on('survive', () => {
      this.zombieQuestCounter = this.scene.getZombiesLength();
      this.scene.time.addEvent({
        delay: 1000,
        callback: this.timer,
        repeat: 300,
      });

      this.surviveLabel = new QuestLabel(
        this.personUi,
        `Survive: 0:${this.personUi.timer}`,
        20,
        10,
        110
      );
    });

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
      if (random <= 5) {
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
      const zombieLength = this.scene.getZombiesLength();
      if (this.zombieQuestCounter - zombieLength >= 5) {
        this.scene.createGroupOfZombies(this.getRandomArrayOfZombies());
      }

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
      this.scene.createGroupOfZombies(ZOMBIE_COORDINATES[number]);
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
          case 1:
            this.person.speed = 150;
            this.speedUp = new QuestLabel(
              this.personUi,
              '-speed up: ',
              20,
              10,
              150
            );
            setTimeout(() => {
              if (!this.speedUp) throw new Error('speedUp error');
              this.speedUp.crossLine();
              this.speedUp = null;
              this.person.speed = 100;
            }, 10000);
            break;
          case 0:
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

  getRandomArrayOfZombies() {
    const arr = [...ZOMBIE_COORDINATES[4]];

    while (arr.length > 6) {
      arr.splice(Phaser.Math.Between(0, arr.length), 1);
    }
    return arr;
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
