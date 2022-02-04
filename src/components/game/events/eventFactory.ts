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
export default class EventFactory {
  private roofs: Phaser.Tilemaps.TilemapLayer[];
  private scene: Dungeon;
  private person: Phaser.Physics.Arcade.Sprite;
  private personUi: Phaser.Scene;
  private questLabels: QuestLabel[];
  private dialogQueue: number[];
  private counter: number;

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
    this.dialogQueue = [];
    this.counter = 0;
  }

  handleGetItem(item: Phaser.Physics.Arcade.Image, itemRandom: number) {
    sceneEvents.emit('dialog', 8 + itemRandom);
    item.destroy();
  }

  run() {
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
      if (this.counter > 15) {
        this.scene.cameras.main.fadeOut(2000);
        //TODO
        setTimeout(() => {
          this.person.setX(400);
          this.person.setY(400);
        }, 3000);
        setTimeout(() => {
          this.scene.cameras.main.fadeIn(1000);
        }, 3000);
      }
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
